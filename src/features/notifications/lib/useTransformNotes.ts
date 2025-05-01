import { NotificationItem } from '@/shared/api/notifications/notificationsApi.types'
import { NotificationItemProps } from '@/shared/ui/notification-item'

export const useTransformNotes = (notifications: NotificationItem[] | undefined) => {
  const newNotifications: NotificationItemProps[] = []
  if (notifications)
    notifications.map(note => {
      newNotifications.push({
        ...note,
        path: `/${note.id}`,
        notificationId: note.id,
        title: note.isRead ? 'Новое уведомление!' : 'Новое уведомление!',
      })
    })

  const newNotes = newNotifications.filter(note => !note.isRead).length

  return { newNotifications, newNotes }
}
