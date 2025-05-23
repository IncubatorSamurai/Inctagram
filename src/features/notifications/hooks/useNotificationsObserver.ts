import { useCallback, useEffect, useRef } from 'react'

interface Notification {
  id: number
}

type UseNotificationsObserverProps = {
  notifications: Notification[]
  isFetching: boolean
  isLoading: boolean
  isShouldStopFetching: boolean
  observeParams?: IntersectionObserverInit
  updateNotification: (args: { cursor: string }) => void
  setReadIds: React.Dispatch<React.SetStateAction<Set<number>>>
}

export function useNotificationsObserver({
  notifications,
  isFetching,
  isLoading,
  isShouldStopFetching,
  observeParams,
  updateNotification,
  setReadIds,
}: UseNotificationsObserverProps) {
  const itemRef = useRef<HTMLElement[]>([])
  const lastElement = useRef<HTMLElement | null>(null)

  const itemObserver = useRef<IntersectionObserver | null>(null)
  const lastObserver = useRef<IntersectionObserver | null>(null)

  const pendingReadIds = useRef<Set<number>>(new Set())

  useEffect(() => {
    return () => {
      itemObserver.current?.disconnect()
      lastObserver.current?.disconnect()
    }
  }, [])

  const onLastItemVisible = useCallback(
    (targetEl: IntersectionObserverEntry, observer: IntersectionObserver) => {
      if (isShouldStopFetching || isFetching) return

      const id = targetEl.target.getAttribute('data-id')
      if (notifications?.at(-1)?.id !== Number(id)) return

      updateNotification({ cursor: id as string })
      observer.unobserve(targetEl.target)
    },
    [isShouldStopFetching, isFetching, notifications, updateNotification]
  )

  const lastItemObserverRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node || isFetching) return

      lastElement.current = node

      if (lastObserver.current) {
        lastObserver.current.disconnect()
      }

      lastObserver.current = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            onLastItemVisible(entry, lastObserver.current!)
          }
        })
      }, observeParams)

      lastObserver.current.observe(node)
    },
    [isFetching, onLastItemVisible, observeParams]
  )

  const markAsReadOnVisible = useCallback(
    (targetEl: IntersectionObserverEntry, observer: IntersectionObserver) => {
      if (isFetching || isLoading) return

      const id = targetEl.target.getAttribute('data-id')
      const isRead = targetEl.target.getAttribute('data-isread') === 'true'

      if (!isRead) {
        const numericId = Number(id)
        if (pendingReadIds.current.has(numericId)) return
        pendingReadIds.current.add(numericId)
        setReadIds(prev => new Set(prev).add(numericId))
      }

      observer.unobserve(targetEl.target)
    },
    [isFetching, isLoading, setReadIds]
  )

  const itemObserverRef = useCallback(
    (node: HTMLElement | null, index: number) => {
      if (!node || isFetching || isLoading) return

      itemRef.current[index] = node

      if (!itemObserver.current) {
        itemObserver.current = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              markAsReadOnVisible(entry, itemObserver.current!)
            }
          })
        }, observeParams)
      }

      itemObserver.current.observe(node)
    },
    [isFetching, isLoading, markAsReadOnVisible, observeParams]
  )

  return {
    itemObserverRef,
    lastItemObserverRef,
  }
}
