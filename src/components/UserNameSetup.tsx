
import React, { useState } from 'react';
import { User } from 'lucide-react';

interface UserNameSetupProps {
  onNameSet: (name: string) => void;
}

const UserNameSetup = ({ onNameSet }: UserNameSetupProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSet(name.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name.trim()) {
      e.preventDefault();
      onNameSet(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <User size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo ao Chat!</h1>
            <p className="text-gray-600">Como você gostaria de ser chamado?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className={`w-full py-3 rounded-full transition-all duration-200 font-medium ${
                name.trim()
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Entrar no Chat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserNameSetup;
