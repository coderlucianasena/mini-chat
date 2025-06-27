
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSendMessage, disabled = false }: MessageInputProps) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !disabled) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="flex-1">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          disabled={disabled}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={!inputText.trim() || disabled}
        className={`p-2 rounded-full transition-colors ${
          inputText.trim() && !disabled
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default MessageInput;
