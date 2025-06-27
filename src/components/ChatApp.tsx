
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Título principal */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Mini Chat</h1>
        <p className="text-gray-600">Converse em tempo real</p>
      </div>

      {/* Container do chat */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 pb-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 h-full flex flex-col overflow-hidden">
          {/* Header do chat */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Chat em Grupo</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-blue-100 text-sm">{messages.length} mensagens</span>
              </div>
            </div>
          </div>

          {/* Área de mensagens */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-4">💬</div>
                <p>Nenhuma mensagem ainda. Seja o primeiro a conversar!</p>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <Message 
                    key={message.id} 
                    message={message} 
                    isNew={index >= messages.length - 1}
                  />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input de mensagem */}
          <div className="p-6 bg-white border-t border-gray-100">
            <MessageInput onSendMessage={sendMessage} disabled={isLoading} />
            {isLoading && (
              <div className="flex items-center justify-center mt-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-sm text-gray-500">Enviando...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
