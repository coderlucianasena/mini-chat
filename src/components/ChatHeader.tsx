
import React from 'react';
import { Bell, BellOff, Moon, Sun, Settings } from 'lucide-react';
import { Switch } from './ui/switch';
import { useNotifications } from '../hooks/useNotifications';
import { useTheme } from '../hooks/useTheme';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ChatHeaderProps {
  userName: string;
  onNameChange: () => void;
}

const ChatHeader = ({ userName, onNameChange }: ChatHeaderProps) => {
  const { permission, isSupported } = useNotifications();
  const { theme, toggleTheme, isDark } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage<boolean>('notifications-enabled', true);

  const handleNotificationToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    if (enabled && permission === 'default') {
      Notification.requestPermission();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 px-6 py-4">
      {/* Título do Mini Chat */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-white mb-1">Mini Chat</h1>
        <p className="text-blue-100 text-sm">Aplicação de chat em tempo real</p>
      </div>

      {/* Informações do usuário e controles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white/30">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold text-white text-lg">{userName}</h2>
            <p className="text-sm text-blue-100">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Toggle de Notificações */}
          {isSupported && (
            <div className="flex items-center gap-2">
              {notificationsEnabled && permission === 'granted' ? (
                <Bell size={16} className="text-white" />
              ) : (
                <BellOff size={16} className="text-white" />
              )}
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={handleNotificationToggle}
                className="data-[state=checked]:bg-white/30 data-[state=unchecked]:bg-white/10"
              />
            </div>
          )}

          {/* Toggle Dark/Light Mode */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title={isDark ? 'Modo claro' : 'Modo escuro'}
          >
            {isDark ? (
              <Sun size={18} className="text-white" />
            ) : (
              <Moon size={18} className="text-white" />
            )}
          </button>

          {/* Configurações */}
          <div className="relative group">
            <button
              onClick={onNameChange}
              className="p-2 hover:bg-white/10 rounded-full transition-colors group relative"
              title="Clique para alterar seu nome de usuário"
            >
              <Settings size={18} className="text-white" />
            </button>
            <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              Clique aqui para trocar seu nome
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
