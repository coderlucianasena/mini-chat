
import React from 'react';
import { MessageType } from './ChatApp';
import { Avatar, AvatarFallback } from './ui/avatar';

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
  
  // Função para gerar iniciais do nome
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Função para gerar cor baseada no nome
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Função para gerar cor suave do balão baseada na cor do avatar
  const getBalloonColor = (name: string) => {
    const lightColors = [
      'bg-red-100 text-red-800 border-red-200', 
      'bg-blue-100 text-blue-800 border-blue-200', 
      'bg-green-100 text-green-800 border-green-200', 
      'bg-yellow-100 text-yellow-800 border-yellow-200',
      'bg-purple-100 text-purple-800 border-purple-200', 
      'bg-pink-100 text-pink-800 border-pink-200', 
      'bg-indigo-100 text-indigo-800 border-indigo-200', 
      'bg-orange-100 text-orange-800 border-orange-200'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return lightColors[index % lightColors.length];
  };

  return (
    <div 
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${
        isNew ? 'animate-in slide-in-from-bottom-2 duration-300' : ''
      }`}
    >
      {/* Avatar */}
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className={`${getAvatarColor(message.senderName)} text-white text-xs font-semibold`}>
          {getInitials(message.senderName)}
        </AvatarFallback>
      </Avatar>

      {/* Mensagem */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-xs`}>
        {/* Nome do usuário */}
        <span className={`text-xs font-medium mb-1 ${
          isUser ? 'text-indigo-600' : 'text-gray-600'
        }`}>
          {message.senderName}
        </span>
        
        {/* Balão da mensagem */}
        <div className={`px-4 py-2 rounded-2xl shadow-sm border ${
          isUser 
            ? 'bg-indigo-500 text-white' 
            : getBalloonColor(message.senderName)
        }`}>
          <p className="text-sm leading-relaxed">{message.text}</p>
          <div className={`text-xs mt-1 ${
            isUser ? 'text-indigo-100' : 'opacity-70'
          }`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
