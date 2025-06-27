
import React from 'react';
import { Bell, BellOff } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { useLocalStorage } from '../hooks/useLocalStorage';

const NotificationStatus = () => {
  const { permission, isSupported } = useNotifications();
  const [notificationsEnabled] = useLocalStorage<boolean>('notifications-enabled', true);

  if (!isSupported) {
    return null;
  }

  const isActive = notificationsEnabled && permission === 'granted';

  return (
    <div className="flex items-center gap-1 text-xs text-white/80">
      {isActive ? (
        <>
          <Bell size={12} />
          <span>Notificações ativas</span>
        </>
      ) : (
        <>
          <BellOff size={12} />
          <span>Notificações desativadas</span>
        </>
      )}
    </div>
  );
};

export default NotificationStatus;
