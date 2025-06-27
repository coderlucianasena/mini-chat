
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
      {/* Container do chat */}
      <div className="flex-1 max-w-2xl mx-auto w-full p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 h-full flex flex-col overflow-hidden">
          {/* Header do chat */}
          <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              AC
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Ana Clara</h2>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>

          {/* Área de mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-4">💬</div>
                <p>Nenhuma mensagem ainda. Seja o primeiro a conversar!</p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <Message 
                    key={message.id} 
                    message={message}
                  />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input de mensagem */}
          <div className="p-4 bg-white border-t border-gray-100">
            <MessageInput onSendMessage={sendMessage} disabled={isLoading} />
            {isLoading && (
              <div className="flex items-center justify-center mt-2">
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
