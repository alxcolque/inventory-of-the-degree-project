import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { appDB } from '../../api/appDB';

export interface Notification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: {
    title: string;
    message: string;
    type: string;
    user_id?: number;
    user_name?: string;
    user_email?: string;
    login_time?: string;
    ip_address?: string;
    user_agent?: string;
    data?: any;
  };
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  fetchNotifications: (userId: number) => Promise<void>;
  fetchUnreadNotifications: (userId: number) => Promise<void>;
  markNotificationAsRead: (notificationId: string, userId: number) => Promise<void>;
  markAllNotificationsAsRead: (userId: number) => Promise<void>;
  clearError: () => void;
  playNotificationSound: () => void;
}

const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
      error: null,

      setNotifications: (notifications) => {
        const unreadCount = notifications.filter(n => !n.read_at).length;
        set({ notifications, unreadCount });
      },

      addNotification: (notification) => {
        const currentNotifications = get().notifications;
        const exists = currentNotifications.find(n => n.id === notification.id);
        
        if (!exists) {
          const newNotifications = [notification, ...currentNotifications];
          const unreadCount = newNotifications.filter(n => !n.read_at).length;
          
          set({ 
            notifications: newNotifications, 
            unreadCount 
          });

          // Reproducir sonido de notificación
          get().playNotificationSound();
        }
      },

      markAsRead: (notificationId) => {
        const notifications = get().notifications.map(notification =>
          notification.id === notificationId
            ? { ...notification, read_at: new Date().toISOString() }
            : notification
        );
        const unreadCount = notifications.filter(n => !n.read_at).length;
        set({ notifications, unreadCount });
      },

      markAllAsRead: () => {
        const notifications = get().notifications.map(notification => ({
          ...notification,
          read_at: notification.read_at || new Date().toISOString()
        }));
        set({ notifications, unreadCount: 0 });
      },

      removeNotification: (notificationId) => {
        const notifications = get().notifications.filter(n => n.id !== notificationId);
        const unreadCount = notifications.filter(n => !n.read_at).length;
        set({ notifications, unreadCount });
      },

      fetchNotifications: async (userId: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await appDB.get('/notifications', {
            params: {
              id: userId
            }
          });
          if (response.data.success) {
            get().setNotifications(response.data.notifications);
          }
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Error al cargar notificaciones' });
        } finally {
          set({ isLoading: false });
        }
      },

      fetchUnreadNotifications: async (userId: number) => {
        try {
          const response = await appDB.get('/notifications/unread', {
            params: {
              id: userId
            }
          });
          if (response.data.success) {
            set({ unreadCount: response.data.count });
          }
        } catch (error: any) {
          console.error('Error fetching unread notifications:', error);
        }
      },

      markNotificationAsRead: async (notificationId, userId) => {
        try {
          const response = await appDB.post(`/notifications/${notificationId}/read`, {
            id: userId
          });
          if (response.data.success) {
            get().markAsRead(notificationId);
          }
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Error al marcar como leída' });
        }
      },

      markAllNotificationsAsRead: async (userId: number) => {
        try {
          const response = await appDB.post('/notifications/mark-all-read', {
            id: userId
          });
          if (response.data.success) {
            get().markAllAsRead();
          }
        } catch (error: any) {
          set({ error: error.response?.data?.message || 'Error al marcar todas como leídas' });
        }
      },

      clearError: () => set({ error: null }),

      playNotificationSound: () => {
        try {
          const audio = new Audio('/sounds/notification.mp3');
          audio.volume = 0.5;
          audio.play().catch(error => {
            console.warn('No se pudo reproducir el sonido de notificación:', error);
          });
        } catch (error) {
          console.warn('Error al crear el audio de notificación:', error);
        }
      },
    }),
    {
      name: 'notification-store',
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
      }),
    }
  )
);

export default useNotificationStore;
