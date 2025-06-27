import { useState, useEffect, useRef } from 'react';
import { getMessages, postMessage, ApiMessage, NewMessage } from '../services/mockApi';
import { MessageType } from '../components/ChatApp';
import { useNotifications } from './useNotifications';
import { useAudio } from './useAudio';

// Função para converter ApiMessage para MessageType
const convertApiMessageToMessageType = (apiMessage: ApiMessage): MessageType => ({
  id: apiMessage.id,
  text: apiMessage.text,
  sender: apiMessage.author === 'Você' ? 'user' : 'other',
  timestamp: new Date(),
  senderName: apiMessage.author
});

export const useMessages = (userName?: string) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [userTyping, setUserTyping] = useState(false);
  
  // Refs para controlar a simulação
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageIndexRef = useRef(0);
  const initialMessagesIndexRef = useRef(0);

  const { notifyNewMessage } = useNotifications();
  const { playSendSound } = useAudio();

  // Lista de mensagens iniciais que serão carregadas uma por vez
  const initialMessages = [
    { id: 1, author: "João", text: "Olá, pessoal!" },
    { id: 2, author: "Maria", text: "Oi, João! Tudo bem?" },
    { id: 3, author: "João", text: "Tudo ótimo! E com você?" }
  ];

  // Lista expandida de mensagens que serão enviadas sequencialmente após as iniciais
  const simulatedMessages = [
    { author: "Ana", text: "Que legal esse chat!" },
    { author: "Carlos", text: "Oi pessoal! Como vocês estão?" },
    { author: "Maria", text: "Tudo bem por aqui! Acabei de chegar do trabalho." },
    { author: "João", text: "Que bom ver todos aqui! Como foi o dia de vocês?" },
    { author: "Ana", text: "Meu dia foi corrido, mas consegui terminar um projeto importante!" },
    { author: "Carlos", text: "Parabéns, Ana! Aqui também foi bem produtivo." },
    { author: "Maria", text: "Que ótimo! Gosto quando todos estão bem." },
    { author: "João", text: "Verdade! E esse chat está funcionando perfeitamente." },
    { author: "Ana", text: "A interface está muito bonita! Quem desenvolveu?" },
    { author: "Carlos", text: "Realmente, está bem intuitivo de usar." },
    { author: "Maria", text: "Adorei os emojis e as cores diferentes para cada pessoa." },
    { author: "João", text: "E o indicador de digitação é muito útil!" },
    { author: "Ana", text: "Sim! Dá para saber quando alguém está escrevendo." },
    { author: "Carlos", text: "Pessoal, vamos marcar um encontro presencial em breve?" },
    { author: "Maria", text: "Boa ideia! Faz tempo que não nos vemos pessoalmente." },
    { author: "João", text: "Eu topo! Que tal no próximo fim de semana?" },
    { author: "Ana", text: "Perfeito! Vou verificar minha agenda." },
    { author: "Carlos", text: "Ótimo! Vou criar um grupo para organizarmos." },
    { author: "Maria", text: "Mal posso esperar para nos encontrarmos!" },
    { author: "João", text: "Será uma ótima oportunidade para conversarmos mais." }
  ];

  // Função para limpar timeouts
  const clearSimulation = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setTypingUser(null);
  };

  // Função para carregar mensagens iniciais sequencialmente
  const loadInitialMessagesSequentially = () => {
    if (initialMessagesIndexRef.current >= initialMessages.length) {
      // Após carregar todas as mensagens iniciais, começar simulação
      timeoutRef.current = setTimeout(() => {
        processNextMessage();
      }, 3000);
      return;
    }

    const currentMessage = initialMessages[initialMessagesIndexRef.current];
    const convertedMessage = convertApiMessageToMessageType(currentMessage);
    
    setMessages(prev => [...prev, convertedMessage]);
    console.log(`Mensagem inicial carregada: ${currentMessage.text}`);
    
    initialMessagesIndexRef.current++;
    
    // Agendar próxima mensagem inicial
    timeoutRef.current = setTimeout(() => {
      loadInitialMessagesSequentially();
    }, 1500);
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
    }, Math.random() * 1000 + 2000);
  };

  // Carrega mensagens iniciais e inicia simulação quando userName muda
  useEffect(() => {
    if (!userName || userName.trim() === '') {
      setMessages([]);
      setTypingUser(null);
      setUserTyping(false);
      clearSimulation();
      return;
    }

    // Limpar simulação anterior
    clearSimulation();
    messageIndexRef.current = 0;
    initialMessagesIndexRef.current = 0;
    setMessages([]);

    console.log('Iniciando carregamento sequencial de mensagens para:', userName);
    
    // Iniciar carregamento sequencial das mensagens iniciais
    timeoutRef.current = setTimeout(() => {
      loadInitialMessagesSequentially();
    }, 1000);

    // Cleanup function
    return () => {
      clearSimulation();
      console.log('Limpando simulação de mensagens');
    };
  }, [userName]);

  const sendMessage = async (text: string) => {
    setIsLoading(true);
    setUserTyping(false);
    
    // Reproduz som de envio
    await playSendSound();
    
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

  const handleUserTyping = (isTyping: boolean) => {
    setUserTyping(isTyping);
  };

  return {
    messages,
    sendMessage,
    isLoading,
    typingUser,
    userTyping,
    handleUserTyping
  };
};
