import { NotificationsResponse } from '@/shared/api/notifications/notificationsApi.types'

export const shouldStopFetching = (readyData?: NotificationsResponse): boolean => {
  if (!readyData) return false

  const { totalCount = 0, pageSize = 0, items } = readyData

  return totalCount <= pageSize || items.length + 1 >= totalCount
}
