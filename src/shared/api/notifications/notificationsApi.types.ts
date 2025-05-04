export type NotificationsArg = {
  cursor?: number
  isRead?: boolean
}

export type NotificationItem = {
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

export type ReadNotificationsArg = {
  ids: number[]
}
