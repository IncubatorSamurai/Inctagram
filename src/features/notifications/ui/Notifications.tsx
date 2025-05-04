import { useGetNotificationQuery } from '@/shared/api/notifications/notificationsApi'
import s from './Notifications.module.scss'
import { BellOutlineIcon } from '@/shared/assets/icons/BellOutlineIcon'
import { Dropdown } from '@/shared/ui/dropdown'
import { NotificationList } from '@/shared/ui/notification-item/NotificationList'

import { useTransformNotes } from '../lib/useTransformNotes'
import { useState } from 'react'
import { NotificationItemProps } from '@/shared/ui/notification-item'
import { Typography } from '@/shared/ui/typography'
import { TriggerButton } from './TriggerButton/TriggerButton'

export const Notifications = () => {
  const { data } = useGetNotificationQuery({})
  const { newNotifications, newNotes } = useTransformNotes(data?.items)
  console.log(data)
  return (
    <div>
      <Dropdown
        classItemsContainer={s.dropdown}
        align={'end'}
        classContent={s.content}
        isArrow
        iconTrigger={<TriggerButton count={newNotes} />}
      >
        <Typography variant="medium_text_16">Уведомления</Typography>
        {newNotifications ? (
          <div className={s.notes}>
            <NotificationList notifications={data?.items} />
          </div>
        ) : (
          <Typography>У вас нет новых уведомлений</Typography>
        )}
      </Dropdown>
    </div>
  )
}
