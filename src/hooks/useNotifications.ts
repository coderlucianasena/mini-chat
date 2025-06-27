
import { useEffect, useState } from 'react';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  // Solicita permissão para notificações na inicialização
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((perm) => {
          setPermission(perm);
        });
      }
    }
  }, []);

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (!('Notification' in window)) {
      console.warn('Este navegador não suporta notificações');
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
    // Só notifica se a aba não estiver ativa
    if (document.hidden) {
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
    isSupported: 'Notification' in window
  };
};
