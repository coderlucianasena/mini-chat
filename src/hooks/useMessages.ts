
import { useState, useEffect } from 'react';
import { getMessages, postMessage, ApiMessage, NewMessage } from '../services/mockApi';
import { MessageType } from '../components/ChatApp';

// Função para converter ApiMessage para MessageType
const convertApiMessageToMessageType = (apiMessage: ApiMessage): MessageType => ({
  id: apiMessage.id,
  text: apiMessage.text,
  sender: apiMessage.author === 'Você' ? 'user' : 'other',
  timestamp: new Date(),
  senderName: apiMessage.author
});

export const useMessages = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Carrega mensagens iniciais
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      try {
        const apiMessages = await getMessages();
        const convertedMessages = apiMessages.map(convertApiMessageToMessageType);
        setMessages(convertedMessages);
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, []);

  // Simula chegada de novas mensagens a cada 5 segundos
  useEffect(() => {
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
  }, []);

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
