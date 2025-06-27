
import { useState, useEffect } from 'react';
import { getMessages, postMessage, ApiMessage, NewMessage } from '../services/mockApi';
import { MessageType } from '../components/ChatApp';
import { useLocalStorage } from './useLocalStorage';

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

  // Simula chegada de novas mensagens a cada 5 segundos
  useEffect(() => {
    // Só inicia simulação após carregar mensagens iniciais
    if (!hasLoadedInitialMessages) return;

    const simulatedMessages = [
      { author: "Ana", text: "Que legal esse chat!" },
      { author: "Pedro", text: "Estou gostando da interface!" },
      { author: "Carlos", text: "Como vocês estão hoje?" },
      { author: "Lucia", text: "Esse chat está funcionando bem!" },
      { author: "Roberto", text: "Boa tarde pessoal! 🌅" },
      { author: "Fernanda", text: "Alguém sabe que horas são?" },
      { author: "Diego", text: "Adorei o design deste chat!" },
      { author: "Camila", text: "Vamos conversar mais! 💬" }
    ];

    let messageIndex = 0;

    const interval = setInterval(async () => {
      if (messageIndex < simulatedMessages.length) {
        const messageToAdd = simulatedMessages[messageIndex];
        try {
          const newApiMessage = await postMessage(messageToAdd);
          const newMessage = convertApiMessageToMessageType(newApiMessage);
          setMessages(prev => [...prev, newMessage]);
          messageIndex++;
        } catch (error) {
          console.error('Erro ao adicionar mensagem simulada:', error);
        }
      }
    }, 5000); // A cada 5 segundos

    return () => clearInterval(interval);
  }, [hasLoadedInitialMessages, setMessages]);

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
    isLoading
  };
};
