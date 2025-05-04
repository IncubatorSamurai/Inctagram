import { useReadNotificationsMutation } from '@/shared/api/notifications/notificationsApi'
import { NotificationItem as NotificationItemProps } from '@/shared/api/notifications/notificationsApi.types'
import { NotificationItem } from '@/shared/ui/notification-item/NotificationItem'
import { useEffect, useRef, useState } from 'react'

type Props = {
  notifications: NotificationItemProps[]
}
export const NotificationList = ({ notifications }: Props) => {
  const [read, { isLoading }] = useReadNotificationsMutation()
  console.log(notifications)
  const [readIds, setReadIds] = useState<Set<number | null>>(new Set())
  console.log(readIds)
  useEffect(() => {
    if (readIds.size > 0 && !isLoading) {
      setTimeout(() => {
        read(Array.from(readIds))
        console.log(Array.from(readIds))
        setReadIds(new Set())
      }, 1000)
    }
  }, [readIds, isLoading])
  const itemRef = useRef<(HTMLLIElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entry => {
      entry.map(targetEl => {
        if (targetEl.isIntersecting) {
          const id = targetEl.target.getAttribute('data-id')
          const isRead = targetEl.target.getAttribute('data-isRead') === 'true'
          if (!isRead) setReadIds(prev => new Set(prev.add(Number(id))))
        }
      })
    })
    if (itemRef.current) {
      itemRef.current.map(
        item => {
          if (item) observer.observe(item)
        },
        {
          root: containerRef,
          threshold: 1,
        }
      )
    }
  }, [notifications])

  return (
    <div ref={containerRef}>
      {notifications.map((i, index) => (
        <NotificationItem
          item={i}
          ref={el => {
            itemRef.current[index] = el
          }}
          key={i.id}
          data-id={i.id}
          data-isRead={i.isRead}
        />
      ))}
    </div>
  )
}
