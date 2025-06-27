
import { useState, useEffect, useRef } from 'react';
import { getMessages, postMessage, ApiMessage, NewMessage } from '../services/mockApi';
import { MessageType } from '../components/ChatApp';
import { useLocalStorage } from './useLocalStorage';
import { useNotifications } from './useNotifications';

// Função para converter ApiMessage para MessageType
const convertApiMessageToMessageType = (apiMessage: ApiMessage): MessageType => ({
  id: apiMessage.id,
  text: apiMessage.text,
  sender: apiMessage.author === 'Você' ? 'user' : 'other',
  timestamp: new Date(),
  senderName: apiMessage.author
});

export const useMessages = () => {
  // Usar localStorage para persistir mensagens
  const [messages, setMessages] = useLocalStorage<MessageType[]>('chat-messages', []);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedInitialMessages, setHasLoadedInitialMessages] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  
  // Ref para controlar se a simulação já foi iniciada
  const simulationInitialized = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { notifyNewMessage } = useNotifications();

  // Carrega mensagens iniciais apenas se não houver mensagens no localStorage
  useEffect(() => {
    const loadMessages = async () => {
      // Se já há mensagens no localStorage, não carregar as iniciais
      if (messages.length > 0) {
        setHasLoadedInitialMessages(true);
        return;
      }

      setIsLoading(true);
      try {
        const apiMessages = await getMessages();
        const convertedMessages = apiMessages.map(convertApiMessageToMessageType);
        setMessages(convertedMessages);
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
      } finally {
        setIsLoading(false);
        setHasLoadedInitialMessages(true);
      }
    };

    if (!hasLoadedInitialMessages) {
      loadMessages();
    }
  }, [hasLoadedInitialMessages]);

  // Simula chegada de novas mensagens - executa apenas uma vez
  useEffect(() => {
    // Só inicia simulação se não foi inicializada e as mensagens iniciais foram carregadas
    if (simulationInitialized.current || !hasLoadedInitialMessages) return;

    // Marcar que a simulação foi inicializada
    simulationInitialized.current = true;

    // Sequência de mensagens
    const messageSequence = [
      { author: "João", text: "Olá, pessoal!" },
      { author: "Maria", text: "Oi, João! Tudo bem?" },
      { author: "João", text: "Tudo ótimo! E com você?" },
      { author: "Ana", text: "Que legal esse chat!" }
    ];

    let currentIndex = 0;
    console.log('Iniciando simulação única com sequência:', messageSequence);

    intervalRef.current = setInterval(async () => {
      const currentMessage = messageSequence[currentIndex];
      console.log(`Enviando mensagem ${currentIndex + 1}/4:`, currentMessage);
      
      // Mostrar indicador de digitação por 2 segundos
      setTypingUser(currentMessage.author);
      
      setTimeout(async () => {
        try {
          const newApiMessage = await postMessage(currentMessage);
          const newMessage = convertApiMessageToMessageType(newApiMessage);
          
          // Notificar sobre nova mensagem recebida
          notifyNewMessage(newMessage.senderName, newMessage.text);
          
          setMessages(prev => [...prev, newMessage]);
          setTypingUser(null);
          
          // Avançar para próxima mensagem na sequência
          currentIndex = (currentIndex + 1) % messageSequence.length;
          
        } catch (error) {
          console.error('Erro ao adicionar mensagem simulada:', error);
          setTypingUser(null);
        }
      }, 2000);
    }, 5000);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      console.log('Limpando interval da simulação');
    };
  }, [hasLoadedInitialMessages, notifyNewMessage]);

  const sendMessage = async (text: string) => {
    setIsLoading(true);
    try {
      const newApiMessage = await postMessage({ author: 'Você', text });
      const newMessage = convertApiMessageToMessageType(newApiMessage);
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
    typingUser
  };
};
