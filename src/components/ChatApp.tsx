
import React, { useRef, useEffect } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import TypingIndicator from './TypingIndicator';
import UserNameSetup from './UserNameSetup';
import { useMessages } from '../hooks/useMessages';
import { useUserName } from '../hooks/useUserName';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4 transition-colors">
      {/* Container do chat */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 h-[700px] flex flex-col overflow-hidden transition-colors">
          {/* Header do chat */}
          <ChatHeader 
            userName={userName} 
            onNameChange={() => setUserName('')}
          />

          {/* Área de mensagens */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-gray-600 dark:text-gray-300">Carregando mensagens...</p>
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
                    <div className="bg-blue-100 dark:bg-blue-900/50 rounded-2xl px-4 py-3 max-w-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-blue-600 dark:text-blue-300">Você está digitando</span>
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
          <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
            <MessageInput 
              onSendMessage={sendMessage} 
              disabled={isLoading} 
              userName={userName}
              onTyping={handleUserTyping}
            />
            {isLoading && (
              <div className="flex items-center justify-center mt-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Enviando...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
