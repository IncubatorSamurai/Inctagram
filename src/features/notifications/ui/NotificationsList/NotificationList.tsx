import {
  useLazyGetNotificationQuery,
  useReadNotificationsMutation,
} from '@/shared/api/notifications/notificationsApi'
import { NotificationItem } from '@/shared/ui/notification-item/NotificationItem'
import { useRef, useState } from 'react'
import { shouldStopFetching } from '../../lib/shouldStopFetching'
import { useDebouncedEffect } from '@/shared/hooks'
import { NotificationsResponse } from '@/shared/api/notifications/notificationsApi.types'
import { useNotificationsObserver } from '../../hooks/useNotificationsObserver'

type Props = { data: NotificationsResponse }

export const NotificationList = ({ data }: Props) => {
  const [updateNotification, { isFetching }] = useLazyGetNotificationQuery()

  const notifications = data?.items

  const [readNotes, { isLoading }] = useReadNotificationsMutation()

  const [readIds, setReadIds] = useState<Set<number>>(new Set())

  const pendingReadIds = useRef<Set<number>>(new Set())

  const isShouldStopFetching = shouldStopFetching(data)

  const observeParams = {
    threshold: 0.8,
  }
  useDebouncedEffect(
    () => {
      if (readIds.size === 0) return

      const idsArray = Array.from(readIds)

      readNotes(idsArray as number[])
        .unwrap()
        .then(() => {
          setReadIds(new Set())
          pendingReadIds.current.clear()
        })
    },
    [readIds],
    500
  )

  const { itemObserverRef, lastItemObserverRef } = useNotificationsObserver({
    notifications,
    isFetching,
    isLoading,
    isShouldStopFetching,
    observeParams,
    updateNotification,
    setReadIds,
  })

  return (
    <div>
      {notifications?.map((i, index) => (
        <NotificationItem
          item={i}
          ref={el => {
            itemObserverRef(el, index)
            if (index === notifications.length - 1) {
              lastItemObserverRef(el)
            }
          }}
          key={`${i.id}-${index}`}
          data-id={i.id}
          data-isread={i.isRead}
        />
      ))}
    </div>
  )
}
