import {
  NotificationItem,
  NotificationItemProps,
} from '@/shared/ui/notification-item/NotificationItem'
import { useEffect, useRef, useState } from 'react'

type Props = {
  notifications: NotificationItemProps[]
}
export const NotificationList = ({ notifications }: Props) => {
  const [readIds, setReadIds] = useState<Set<number | null>>(new Set())

  const itemRef = useRef<(HTMLLIElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entry => {
      entry.map(targetEl => {
        if (targetEl.isIntersecting) {
          const id = targetEl.target.getAttribute('data-id')
          const isRead = targetEl.target.getAttribute('data-isRead')
          if (!isRead) return
          setReadIds(prev => new Set(prev.add(Number(id))))
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
          threshold: 0.5,
        }
      )
    }
  }, [notifications])

  return (
    <div ref={containerRef}>
      {notifications.map((i, index) => (
        <NotificationItem
          ref={el => {
            itemRef.current[index] = el
          }}
          key={i.notificationId}
          isRead={i.isRead}
          data-id={i.notificationId}
          data-isRead={i.isRead}
          createdAt={i.createdAt}
          message={i.message}
          notificationId={i.notificationId}
          title={i.title}
          path={i.path}
        />
      ))}
    </div>
  )
}
