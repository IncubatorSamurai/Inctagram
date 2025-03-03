import { NotificationItem, notifications } from '@/shared/ui/notification-item/NotificationItem'

export const NotificationList = () => {
  return (
    <>
      {notifications.map(i => (
        <NotificationItem
          key={i.id}
          isNew={i.isNew}
          date={i.date}
          text={i.message}
          id={i.id}
          label={i.title}
          path={i.path}
        />
      ))}
    </>
  )
}
