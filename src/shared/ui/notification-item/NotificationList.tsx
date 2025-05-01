import {
  NotificationItem,
  NotificationItemProps,
} from '@/shared/ui/notification-item/NotificationItem'

type Props = {
  notifications: NotificationItemProps[]
}
export const NotificationList = ({ notifications }: Props) => {
  return (
    <>
      {notifications.map(i => (
        <NotificationItem
          key={i.notificationId}
          isRead={i.isRead}
          createdAt={i.createdAt}
          message={i.message}
          notificationId={i.notificationId}
          title={i.title}
          path={i.path}
        />
      ))}
    </>
  )
}
