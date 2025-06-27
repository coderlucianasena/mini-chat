
import React from 'react';
import { MessageType } from './ChatApp';

interface MessageProps {
  message: MessageType;
}

const Message = ({ message }: MessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isUser = message.sender === 'user';

  return (
    <div className="flex flex-col space-y-1">
      {/* Nome do usuário apenas para mensagens de outros */}
      {!isUser && (
        <div className="text-xs text-gray-600 font-medium px-1">
          {message.senderName}
        </div>
      )}
      
      {/* Mensagem */}
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
          isUser 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : 'bg-gray-100 text-gray-800 rounded-bl-md'
        }`}>
          <p className="leading-relaxed">{message.text}</p>
          <div className={`text-xs mt-1 ${
            isUser ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
