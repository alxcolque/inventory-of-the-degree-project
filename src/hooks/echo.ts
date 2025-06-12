import { useEffect, useRef } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useAuthStore } from '../stores';
import useNotificationStore from '../stores/notifications/notifications.store';

declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo<any>;
  }
}

// Configuración de Echo
const initializeEcho = (token: string) => {
  window.Pusher = Pusher;

  return new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
  });
};

export const useEcho = () => {
  const { user, token } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const echoRef = useRef<Echo<any> | null>(null);
  const channelsRef = useRef<Set<string>>(new Set());

  // Inicializar Echo cuando el usuario está autenticado
  useEffect(() => {
    if (user && token && !echoRef.current) {
      try {
        echoRef.current = initializeEcho(token);
        window.Echo = echoRef.current;
        console.log('Echo initialized successfully');
      } catch (error) {
        console.error('Error initializing Echo:', error);
      }
    }

    return () => {
      if (echoRef.current && !user) {
        echoRef.current.disconnect();
        echoRef.current = null;
        channelsRef.current.clear();
        console.log('Echo disconnected');
      }
    };
  }, [user, token]);

  // Configurar canales de notificaciones
  useEffect(() => {
    if (!echoRef.current || !user) return;

    const echo = echoRef.current;

    // Canal privado para notificaciones del usuario
    const privateChannelName = `App.Models.User.${user.id}`;
    if (!channelsRef.current.has(privateChannelName)) {
      try {
        echo
          .private(privateChannelName)
          .notification((notification: any) => {
            console.log('Private notification received:', notification);
            addNotification({
              id: notification.id || Date.now().toString(),
              type: notification.type || 'general',
              notifiable_type: 'App\\Models\\User',
              notifiable_id: user.id,
              data: notification,
              read_at: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          });

        channelsRef.current.add(privateChannelName);
        console.log(`Subscribed to private channel: ${privateChannelName}`);
      } catch (error) {
        console.error('Error subscribing to private channel:', error);
      }
    }

    // Canal para administradores (si el usuario es admin)
    if (user.roles.includes('admin')) {
      const adminChannelName = 'admins';
      if (!channelsRef.current.has(adminChannelName)) {
        try {
          echo
            .private(adminChannelName)
            .listen('.notification', (notification: any) => {
              console.log('Admin notification received:', notification);
              addNotification({
                id: notification.id || Date.now().toString(),
                type: notification.type || 'admin',
                notifiable_type: 'App\\Models\\User',
                notifiable_id: user.id,
                data: notification,
                read_at: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });
            });

          channelsRef.current.add(adminChannelName);
          console.log('Subscribed to admin channel');
        } catch (error) {
          console.error('Error subscribing to admin channel:', error);
        }
      }
    }

    // Canal público para notificaciones generales
    const publicChannelName = 'notifications';
    if (!channelsRef.current.has(publicChannelName)) {
      try {
        echo
          .channel(publicChannelName)
          .listen('.notification', (notification: any) => {
            console.log('Public notification received:', notification);
            addNotification({
              id: notification.id || Date.now().toString(),
              type: notification.type || 'broadcast',
              notifiable_type: 'App\\Models\\User',
              notifiable_id: user.id,
              data: notification,
              read_at: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          });

        channelsRef.current.add(publicChannelName);
        console.log('Subscribed to public notifications channel');
      } catch (error) {
        console.error('Error subscribing to public channel:', error);
      }
    }

    // Cleanup cuando el usuario cambia
    return () => {
      if (echoRef.current) {
        channelsRef.current.forEach(channelName => {
          try {
            if (channelName.startsWith('private-')) {
              echoRef.current?.leave(channelName);
            } else {
              echoRef.current?.leaveChannel(channelName);
            }
          } catch (error) {
            console.warn(`Error leaving channel ${channelName}:`, error);
          }
        });
        channelsRef.current.clear();
      }
    };
  }, [user, addNotification]);

  return {
    echo: echoRef.current,
    isConnected: !!echoRef.current && !!user,
  };
};
