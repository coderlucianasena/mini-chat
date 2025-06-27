
import React, { useRef, useEffect } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import NotificationStatus from './NotificationStatus';
import TypingIndicator from './TypingIndicator';
import UserNameSetup from './UserNameSetup';
import { useMessages } from '../hooks/useMessages';
import { useUserName } from '../hooks/useUserName';
import { Settings } from 'lucide-react';

export interface MessageType {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  senderName: string;
}

const ChatApp = () => {
  const { userName, setUserName, hasUserName } = useUserName();
  const { messages, sendMessage, isLoading, typingUser, userTyping, handleUserTyping } = useMessages(hasUserName ? userName : undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUser, userTyping]);

  // Se o usuário não definiu o nome, mostrar tela de configuração
  if (!hasUserName || !userName.trim()) {
    return <UserNameSetup onNameSet={setUserName} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Container do chat */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 h-[600px] flex flex-col overflow-hidden">
          {/* Header do chat */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white/30">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-semibold text-white text-lg">{userName}</h2>
                <p className="text-sm text-blue-100">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <NotificationStatus />
              <div className="relative group">
                <button
                  onClick={() => setUserName('')}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group relative"
                  title="Clique para alterar seu nome de usuário"
                >
                  <Settings size={20} className="text-white" />
                </button>
                <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  Clique aqui para trocar seu nome
                </div>
              </div>
            </div>
          </div>

          {/* Área de mensagens */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/80">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-gray-600">Carregando mensagens...</p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <Message 
                    key={message.id} 
                    message={message}
                  />
                ))}
                {typingUser && (
                  <TypingIndicator userName={typingUser} />
                )}
                {userTyping && (
                  <div className="flex justify-end">
                    <div className="bg-blue-100 rounded-2xl px-4 py-3 max-w-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-blue-600">Você está digitando</span>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input de mensagem */}
          <div className="p-6 bg-white/90 backdrop-blur-sm border-t border-gray-100/50">
            <MessageInput 
              onSendMessage={sendMessage} 
              disabled={isLoading} 
              userName={userName}
              onTyping={handleUserTyping}
            />
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
