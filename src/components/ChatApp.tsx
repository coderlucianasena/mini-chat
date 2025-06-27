
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import Message from './Message';
import MessageInput from './MessageInput';

export interface MessageType {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  senderName: string;
}

const ChatApp = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      text: "Olá! Como você está hoje?",
      sender: 'other',
      timestamp: new Date(Date.now() - 300000), // 5 minutos atrás
      senderName: "Ana"
    },
    {
      id: 2,
      text: "Oi Ana! Estou bem, obrigado por perguntar 😊",
      sender: 'user',
      timestamp: new Date(Date.now() - 240000), // 4 minutos atrás
      senderName: "Você"
    },
    {
      id: 3,
      text: "Que bom! Você viu as novidades do projeto?",
      sender: 'other',
      timestamp: new Date(Date.now() - 180000), // 3 minutos atrás
      senderName: "Ana"
    },
    {
      id: 4,
      text: "Ainda não tive tempo de ver. Pode me contar?",
      sender: 'user',
      timestamp: new Date(Date.now() - 120000), // 2 minutos atrás
      senderName: "Você"
    },
    {
      id: 5,
      text: "Claro! Implementamos uma nova funcionalidade de chat em tempo real. Ficou incrível! 🚀",
      sender: 'other',
      timestamp: new Date(Date.now() - 60000), // 1 minuto atrás
      senderName: "Ana"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newMessage: MessageType = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date(),
      senderName: "Você"
    };

    setMessages(prev => [...prev, newMessage]);

    // Simular resposta automática após 2 segundos
    setTimeout(() => {
      const responses = [
        "Interessante! Me conte mais sobre isso.",
        "Que legal! Adorei saber disso 😄",
        "Entendi! Obrigada por compartilhar.",
        "Nossa, que incrível! 🎉",
        "Perfeito! Vamos continuar conversando."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const autoMessage: MessageType = {
        id: Date.now(),
        text: randomResponse,
        sender: 'other',
        timestamp: new Date(),
        senderName: "Ana"
      };

      setMessages(prev => [...prev, autoMessage]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AC</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Ana Clara</h1>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <Message 
            key={message.id} 
            message={message} 
            isNew={index >= messages.length - 1}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatApp;
