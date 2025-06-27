
import { useState, useEffect, useRef } from 'react';
import { getMessages, postMessage, ApiMessage, NewMessage } from '../services/mockApi';
import { MessageType } from '../components/ChatApp';
import { useNotifications } from './useNotifications';

// Função para converter ApiMessage para MessageType
const convertApiMessageToMessageType = (apiMessage: ApiMessage): MessageType => ({
  id: apiMessage.id,
  text: apiMessage.text,
  sender: apiMessage.author === 'Você' ? 'user' : 'other',
  timestamp: new Date(),
  senderName: apiMessage.author
});

export const useMessages = (userName: string) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  
  // Refs para controlar a simulação
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageIndexRef = useRef(0);

  const { notifyNewMessage } = useNotifications();

  // Lista de mensagens que serão enviadas sequencialmente
  const simulatedMessages = [
    { author: "Ana", text: "Que legal esse chat!" },
    { author: "Carlos", text: "Oi pessoal! Como vocês estão?" },
    { author: "Maria", text: "Tudo bem por aqui!" },
    { author: "João", text: "Que bom ver todos aqui!" },
    { author: "Ana", text: "Vamos conversar mais!" },
    { author: "Carlos", text: "Adorei a interface!" }
  ];

  // Função para limpar timeouts
  const clearSimulation = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setTypingUser(null);
  };

  // Função para processar próxima mensagem simulada
  const processNextMessage = () => {
    if (messageIndexRef.current >= simulatedMessages.length) {
      console.log('Todas as mensagens simuladas foram enviadas');
      return;
    }

    const currentMessage = simulatedMessages[messageIndexRef.current];
    console.log(`Usuário ${currentMessage.author} começou a digitar...`);
    
    // Mostrar indicador de digitação
    setTypingUser(currentMessage.author);
    
    // Após 2-3 segundos, enviar a mensagem
    timeoutRef.current = setTimeout(async () => {
      try {
        const newApiMessage = await postMessage(currentMessage);
        const newMessage = convertApiMessageToMessageType(newApiMessage);
        
        // Notificar sobre nova mensagem recebida
        notifyNewMessage(newMessage.senderName, newMessage.text);
        
        setMessages(prev => [...prev, newMessage]);
        setTypingUser(null);
        
        console.log(`Mensagem de ${currentMessage.author} enviada:`, currentMessage.text);
        
        // Avançar para próxima mensagem
        messageIndexRef.current++;
        
        // Agendar próxima mensagem após 5 segundos
        timeoutRef.current = setTimeout(() => {
          processNextMessage();
        }, 5000);
        
      } catch (error) {
        console.error('Erro ao adicionar mensagem simulada:', error);
        setTypingUser(null);
      }
    }, Math.random() * 1000 + 2000); // Entre 2-3 segundos digitando
  };

  // Carrega mensagens iniciais e inicia simulação quando userName muda
  useEffect(() => {
    if (!userName) return;

    // Limpar simulação anterior
    clearSimulation();
    messageIndexRef.current = 0;

    const loadMessages = async () => {
      setIsLoading(true);
      try {
        const apiMessages = await getMessages();
        const convertedMessages = apiMessages.map(convertApiMessageToMessageType);
        setMessages(convertedMessages);
        console.log('Mensagens iniciais carregadas para:', userName);
        
        // Iniciar simulação após carregar mensagens iniciais
        timeoutRef.current = setTimeout(() => {
          processNextMessage();
        }, 2000);
        
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();

    // Cleanup function
    return () => {
      clearSimulation();
      console.log('Limpando simulação de mensagens');
    };
  }, [userName, notifyNewMessage]);

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
