import { ComponentPropsWithRef } from 'react'

import { Link } from '@/i18n/routing'
import s from './NotificationItem.module.scss'
import { Typography } from '@/shared/ui/typography'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

export type NotificationItemProps = {
  notificationId: number
  path: string
  title: string
  message?: string
  isRead?: boolean
  createdAt: string
}
type Props = NotificationItemProps & ComponentPropsWithRef<'li'>
export const NotificationItem = ({
  isRead,
  createdAt,
  message,
  notificationId,
  path,
  title,
  ...props
}: Props) => {
  return (
    <li className={s.notificstion_item} key={notificationId} {...props}>
      <Link href={path} className={s.notification_link}>
        <div className={s.notification_label}>
          <Typography variant={'bold_text_14'}>{title}</Typography>
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
      </Link>
    </li>
  )
}
