import { ComponentPropsWithRef } from 'react'
import s from './NotificationItem.module.scss'
import { Typography } from '@/shared/ui/typography'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import { NotificationItem as INotification } from '@/shared/api/notifications/notificationsApi.types'

export type NotificationItemProps = {
  item: INotification
}
type Props = NotificationItemProps & ComponentPropsWithRef<'li'>
export const NotificationItem = ({ item, ...props }: Props) => {
  const { id, message, isRead, createdAt } = item
  return (
    <li className={s.notificstion_item} key={id} {...props}>
      <div className={s.notification_label}>
        <Typography variant={'bold_text_14'}>Уведомления</Typography>
        {!isRead && (
          <Typography variant={'small_text'} asChild={true}>
            <span>Новое!</span>
          </Typography>
        )}
      </div>
      <div className={s.notification_content}>
        <div className={s.notification_text}>
          <Typography variant={'regular_text_14'}>{message}</Typography>
        </div>
        <time className={s.notification_date} dateTime={createdAt}>
          <Typography variant={'small_text'}>
            {formatDistanceToNow(createdAt, { addSuffix: true, locale: ru })}
          </Typography>
        </time>
      </div>
    </li>
  )
}
