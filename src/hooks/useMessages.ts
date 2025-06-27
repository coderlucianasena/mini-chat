
import { useState, useEffect } from 'react';
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

  // Simula chegada de novas mensagens a cada 5 segundos com indicador de digitação
  useEffect(() => {
    // Só inicia simulação após carregar mensagens iniciais
    if (!hasLoadedInitialMessages) return;

    // Sequência de mensagens simuladas baseada na API inicial + Ana
    const simulatedMessages = [
      { author: "João", text: "Olá, pessoal!" },
      { author: "Maria", text: "Oi, João! Tudo bem?" },
      { author: "João", text: "Tudo ótimo! E com você?" },
      { author: "Ana", text: "Que legal esse chat!" }
    ];

    let messageIndex = 0;
    console.log('Iniciando simulação com', simulatedMessages.length, 'mensagens');

    const interval = setInterval(async () => {
      const messageToAdd = simulatedMessages[messageIndex];
      console.log('Enviando mensagem do índice', messageIndex, ':', messageToAdd);
      
      // Mostrar indicador de digitação por 2 segundos
      setTypingUser(messageToAdd.author);
      
      setTimeout(async () => {
        try {
          const newApiMessage = await postMessage(messageToAdd);
          const newMessage = convertApiMessageToMessageType(newApiMessage);
          
          // Notificar sobre nova mensagem recebida
          notifyNewMessage(newMessage.senderName, newMessage.text);
          
          setMessages(prev => [...prev, newMessage]);
          setTypingUser(null); // Remover indicador de digitação
          
          // Avançar para próxima mensagem, voltando ao início quando chegar ao fim
          messageIndex = (messageIndex + 1) % simulatedMessages.length;
          console.log('Próximo índice será:', messageIndex);
        } catch (error) {
          console.error('Erro ao adicionar mensagem simulada:', error);
          setTypingUser(null);
        }
      }, 2000); // 2 segundos de digitação
    }, 5000); // A cada 5 segundos conforme especificação

    return () => clearInterval(interval);
  }, [hasLoadedInitialMessages, setMessages, notifyNewMessage]);

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
