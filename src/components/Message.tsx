
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

  // Função para obter cor baseada no nome do usuário
  const getUserColor = (name: string) => {
    const colors = [
      { bg: 'bg-orange-100', text: 'text-orange-600', avatar: 'bg-orange-500' },
      { bg: 'bg-green-100', text: 'text-green-600', avatar: 'bg-green-500' },
      { bg: 'bg-purple-100', text: 'text-purple-600', avatar: 'bg-purple-500' },
      { bg: 'bg-pink-100', text: 'text-pink-600', avatar: 'bg-pink-500' },
      { bg: 'bg-yellow-100', text: 'text-yellow-600', avatar: 'bg-yellow-500' },
      { bg: 'bg-red-100', text: 'text-red-600', avatar: 'bg-red-500' },
      { bg: 'bg-indigo-100', text: 'text-indigo-600', avatar: 'bg-indigo-500' },
      { bg: 'bg-cyan-100', text: 'text-cyan-600', avatar: 'bg-cyan-500' },
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const userColor = getUserColor(message.senderName);

  return (
    <div className="flex flex-col space-y-2">
      {/* Avatar e nome do usuário apenas para mensagens de outros */}
      {!isUser && (
        <div className="flex items-center gap-3 px-1">
          <div className={`w-8 h-8 ${userColor.avatar} rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-md`}>
            {message.senderName.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {message.senderName}
          </div>
        </div>
      )}
      
      {/* Mensagem */}
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-lg ${
          isUser 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md' 
            : `${userColor.bg} ${userColor.text} rounded-bl-md border border-white/50`
        }`}>
          <p className="leading-relaxed">{message.text}</p>
          <div className={`text-xs mt-2 ${
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
