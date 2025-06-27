
import React from 'react';

interface TypingIndicatorProps {
  userName: string;
}

const TypingIndicator = ({ userName }: TypingIndicatorProps) => {
  return (
    <div className="flex items-center gap-3 px-1 animate-pulse">
      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-md">
        {userName.charAt(0).toUpperCase()}
      </div>
      <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-600">{userName} está digitando</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
