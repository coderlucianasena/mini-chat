
import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useAudio } from './useAudio';
import { useSoundSettings } from './useSoundSettings';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [notificationsEnabled] = useLocalStorage<boolean>('notifications-enabled', true);
  const { playNotificationSound } = useAudio();
  const { soundEnabled } = useSoundSettings();

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

  const notifyNewMessage = async (senderName: string, messageText: string) => {
    // Só notifica se a aba não estiver ativa e as notificações estiverem habilitadas
    if (document.hidden && notificationsEnabled) {
      showNotification(`Nova mensagem de ${senderName}`, {
        body: messageText,
        tag: 'chat-message',
        requireInteraction: false
      });
    }
    
    // Reproduz som de notificação se as notificações E os sons estiverem habilitados
    if (notificationsEnabled && soundEnabled) {
      await playNotificationSound();
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
