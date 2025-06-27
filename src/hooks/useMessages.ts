
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
  
  // Ref para controlar se a simulação já está rodando
  const simulationRunningRef = useRef(false);
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
        setHasLoadedInitialMessages(true);
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
        setHasLoadedInitialMessages(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (!hasLoadedInitialMessages) {
      loadMessages();
    }
  }, [messages.length, hasLoadedInitialMessages, setMessages]);

  // Simula chegada de novas mensagens - executa apenas uma vez
  useEffect(() => {
    // Só inicia simulação após carregar mensagens iniciais e se não estiver rodando
    if (!hasLoadedInitialMessages || simulationRunningRef.current) return;

    // Marcar que a simulação está rodando
    simulationRunningRef.current = true;

    // Sequência exata conforme especificação: João → Maria → João → Ana
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
          setTypingUser(null); // Remover indicador de digitação
          
          // Avançar para próxima mensagem na sequência
          currentIndex = (currentIndex + 1) % messageSequence.length;
          console.log('Próximo índice será:', currentIndex);
          
          // Se voltou ao início (índice 0), log para confirmar o loop
          if (currentIndex === 0) {
            console.log('Voltando ao início da sequência');
          }
        } catch (error) {
          console.error('Erro ao adicionar mensagem simulada:', error);
          setTypingUser(null);
        }
      }, 2000); // 2 segundos de digitação
    }, 5000); // A cada 5 segundos conforme especificação

    // Cleanup function para limpar o interval
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      simulationRunningRef.current = false;
      console.log('Limpando interval da simulação');
    };
  }, [hasLoadedInitialMessages, notifyNewMessage]); // Removido setMessages da dependência

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
