export type NotificationsRequest = {
  cursor: number
  isRead: boolean
}

type NotificationItem = {
  id: number
  message: string
  isRead: boolean
  createdAt: string
}
export type NotificationsResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: NotificationItem[]
}
