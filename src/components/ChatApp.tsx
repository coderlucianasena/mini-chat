
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Container do chat */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 h-[600px] flex flex-col overflow-hidden">
          {/* Header do chat */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white/30">
              AC
            </div>
            <div>
              <h2 className="font-semibold text-white text-lg">Ana Clara</h2>
              <p className="text-sm text-blue-100">Online</p>
            </div>
          </div>

          {/* Área de mensagens */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/80">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-gray-600">Nenhuma mensagem ainda. Seja o primeiro a conversar!</p>
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
          <div className="p-6 bg-white/90 backdrop-blur-sm border-t border-gray-100/50">
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
