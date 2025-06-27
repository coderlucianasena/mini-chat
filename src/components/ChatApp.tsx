
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
      text: "Olá! Bem-vindo ao Mini Chat! 👋",
      sender: 'other',
      timestamp: new Date(Date.now() - 180000),
      senderName: "Sistema"
    },
    {
      id: 2,
      text: "Esta é uma aplicação de chat desenvolvida em React!",
      sender: 'other',
      timestamp: new Date(Date.now() - 120000),
      senderName: "Sistema"
    },
    {
      id: 3,
      text: "Você pode começar a conversar digitando uma mensagem abaixo.",
      sender: 'other',
      timestamp: new Date(Date.now() - 60000),
      senderName: "Sistema"
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
        senderName: "Sistema"
      };

      setMessages(prev => [...prev, autoMessage]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4">
      {/* Título principal */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Mini Chat</h1>
        <p className="text-gray-600">Aplicação de chat em tempo real</p>
      </div>

      {/* Container do chat */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header do chat */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-t-2xl">
          <h2 className="text-lg font-semibold">Chat Online</h2>
          <p className="text-sm text-indigo-100">{messages.length} mensagens</p>
        </div>

        {/* Área de mensagens */}
        <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((message, index) => (
            <Message 
              key={message.id} 
              message={message} 
              isNew={index >= messages.length - 1}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input de mensagem */}
        <div className="p-4 bg-white border-t border-gray-200">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
