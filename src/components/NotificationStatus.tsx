
import React from 'react';
import { Bell, BellOff } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

const NotificationStatus = () => {
  const { permission, isSupported } = useNotifications();

  if (!isSupported) {
    return null;
  }

  const handleRequestPermission = () => {
    if (permission === 'default') {
      Notification.requestPermission();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {permission === 'granted' ? (
        <div className="flex items-center gap-1 text-green-600 text-xs">
          <Bell size={12} />
          <span>Notificações ativas</span>
        </div>
      ) : permission === 'denied' ? (
        <div className="flex items-center gap-1 text-red-500 text-xs">
          <BellOff size={12} />
          <span>Notificações bloqueadas</span>
        </div>
      ) : (
        <button
          onClick={handleRequestPermission}
          className="flex items-center gap-1 text-blue-600 text-xs hover:text-blue-700 transition-colors"
        >
          <Bell size={12} />
          <span>Ativar notificações</span>
        </button>
      )}
    </div>
  );
};

export default NotificationStatus;
