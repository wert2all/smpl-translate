import { computed, Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Notification, NotificationType } from '../shared.types';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = signal<Notification[]>([]);

  nonReadableNotifications = computed(() =>
    this.notifications().filter(notification => !notification.read)
  );

  sendError(error: string) {
    this.notify(NotificationType.error, error);
  }

  sendSuccess(message: string) {
    this.notify(NotificationType.success, message);
  }

  private notify(type: NotificationType, message: string) {
    const uuid = uuidv4();
    this.notifications.update(notifications => {
      notifications.push({ uuid, type, message, read: false });
      return notifications;
    });

    setTimeout(() => {
      this.notifications.update(notifications =>
        notifications.map(notification => ({
          ...notification,
          read: notification.uuid === uuid ? true : notification.read,
        }))
      );
    }, 5000);
  }
}
