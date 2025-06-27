
import React, { useRef, useEffect } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { useMessages } from '../hooks/useMessages';

export interface MessageType {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  senderName: string;
}

const ChatApp = () => {
  const { messages, sendMessage, isLoading } = useMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Título principal */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-800">Mini Chat</h1>
      </div>

      {/* Container do chat */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 pb-4">
        <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
          {/* Header do chat */}
          <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
            <h2 className="text-lg font-semibold">Chat ({messages.length} mensagens)</h2>
          </div>

          {/* Área de mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-96">
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
          <div className="p-4 border-t border-gray-200">
            <MessageInput onSendMessage={sendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
