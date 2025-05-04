import { useGetNotificationQuery } from '@/shared/api/notifications/notificationsApi'
import s from './Notifications.module.scss'
import { Dropdown } from '@/shared/ui/dropdown'
import { NotificationList } from '@/shared/ui/notification-item/NotificationList'
import { Typography } from '@/shared/ui/typography'
import { TriggerButton } from './TriggerButton/TriggerButton'
import { useMemo } from 'react'

export const Notifications = () => {
  const { data } = useGetNotificationQuery({})
  const notifications = data?.items

  const newNotes = useMemo(() => {
    return notifications?.filter(note => !note.isRead).length
  }, [notifications])

  return (
    <div>
      <Dropdown
        classItemsContainer={s.dropdown}
        align={'end'}
        classContent={s.content}
        isArrow
        iconTrigger={<TriggerButton count={newNotes || 0} />}
      >
        <Typography variant="medium_text_16">Уведомления</Typography>
        {notifications ? (
          <div className={s.notes}>
            <NotificationList notifications={notifications} />
          </div>
        ) : (
          <Typography>У вас нет новых уведомлений</Typography>
        )}
      </Dropdown>
    </div>
  )
}
