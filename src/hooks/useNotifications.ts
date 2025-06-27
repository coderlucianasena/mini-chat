
import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [notificationsEnabled] = useLocalStorage<boolean>('notifications-enabled', true);

  // Solicita permissão para notificações na inicialização
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      
      if (Notification.permission === 'default' && notificationsEnabled) {
        Notification.requestPermission().then((perm) => {
          setPermission(perm);
        });
      }
    }
  }, [notificationsEnabled]);

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (!('Notification' in window) || !notificationsEnabled) {
      return;
    }

    if (permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });
    }
  };

  const notifyNewMessage = (senderName: string, messageText: string) => {
    // Só notifica se a aba não estiver ativa e as notificações estiverem habilitadas
    if (document.hidden && notificationsEnabled) {
      showNotification(`Nova mensagem de ${senderName}`, {
        body: messageText,
        tag: 'chat-message',
        requireInteraction: false
      });
    }
  };

  return {
    permission,
    showNotification,
    notifyNewMessage,
    isSupported: 'Notification' in window,
    isEnabled: notificationsEnabled
  };
};
