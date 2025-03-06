import { ComponentPropsWithoutRef } from 'react'

import { Link } from '@/i18n/routing'
import s from './NotificationItem.module.scss'
import { Typography } from '@/shared/ui/typography'
import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'
import { v4 as uuidv4 } from 'uuid'

export type NotificationItem = {
  id?: string
  label?: string
  path: string
  text?: string
  isNew?: boolean
  date: Date
} & ComponentPropsWithoutRef<'li'>
export const notifications = [
  {
    id: uuidv4(),
    title: 'Новое уведомление!',
    message: 'Следующий платеж у вас спишется через 1 день',
    date: new Date(Date.now() - 60 * 60 * 1000),
    isNew: true,
    path: '#',
  },
  {
    id: uuidv4(),
    title: 'Новое уведомление!',
    message: 'Ваша подписка истекает через 7 дней',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isNew: true,
    path: '#',
  },
  {
    id: uuidv4(),
    title: 'Новое уведомление!',
    message: 'Ваша подписка истекает через 7 дней',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isNew: false,
    path: '#',
  },
  {
    id: uuidv4(),
    title: 'Новое уведомление!',
    message: 'Ваша подписка истекает через 7 дней',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 день назад
    isNew: false,
    path: '#',
  },
]
export const NotificationItem = ({
  isNew,
  date,
  text,
  id,
  label,
  path,
  ...props
}: NotificationItem) => {
  return (
    <li className={s.notificstion_item} key={id} {...props}>
      <Link href={path} className={s.notification_link}>
        <div className={s.notification_label}>
          <Typography variant={'bold_text_14'}>{label}</Typography>
          {isNew && (
            <Typography variant={'small_text'} asChild={true}>
              <span>Новое!</span>
            </Typography>
          )}
        </div>
        <div className={s.notification_content}>
          <div className={s.notification_text}>
            <Typography variant={'regular_text_14'}>{text}</Typography>
          </div>
          <time className={s.notification_date} dateTime={date.toISOString()}>
            <Typography variant={'small_text'}>
              {formatDistanceToNow(date, { addSuffix: true, locale: ru })}
            </Typography>
          </time>
        </div>
      </Link>
    </li>
  )
}
