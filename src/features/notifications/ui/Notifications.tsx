import { useGetNotificationQuery } from '@/shared/api/notifications/notificationsApi'
import s from './Notifications.module.scss'
import { Dropdown } from '@/shared/ui/dropdown'
import { NotificationList } from '@/features/notifications/ui/NotificationsList/NotificationList'
import { Typography } from '@/shared/ui/typography'
import { TriggerButton } from './TriggerButton/TriggerButton'
import { NotificationItem } from '@/shared/api/notifications/notificationsApi.types'

export const Notifications = () => {
  const { data } = useGetNotificationQuery({ cursor: '' })
  const notifications = data?.items.length

  return (
    <div>
      <Dropdown
        classItemsContainer={s.dropdown}
        align={'end'}
        classContent={s.content}
        isArrow
        iconTrigger={<TriggerButton count={data?.notReadCount || 0} />}
      >
        <Typography variant="medium_text_16">Уведомления</Typography>
        {notifications ? (
          <div className={s.notes}>
            <NotificationList data={data} />
          </div>
        ) : (
          <Typography>У вас нет новых уведомлений</Typography>
        )}
      </Dropdown>
    </div>
  )
}
