
import React from 'react';
import { MessageType } from './ChatApp';

interface MessageProps {
  message: MessageType;
  isNew?: boolean;
}

const Message = ({ message, isNew = false }: MessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isUser = message.sender === 'user';

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${
        isNew ? 'animate-in slide-in-from-bottom-2 duration-300' : ''
      }`}
    >
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-md ${
        isUser 
          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md' 
          : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
      }`}>
        {!isUser && (
          <div className="text-xs font-medium text-gray-500 mb-1">
            {message.senderName}
          </div>
        )}
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={`text-xs mt-1 ${
          isUser ? 'text-blue-100' : 'text-gray-400'
        }`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default Message;
