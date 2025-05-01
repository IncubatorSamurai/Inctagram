import { baseApi } from '../baseApi'
import { NotificationsRequest, NotificationsResponse } from './notificationsApi.types'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotification: builder.query<NotificationsResponse, NotificationsRequest>({
      query: ({ cursor, isRead }) => {
        const params = new URLSearchParams()
        if (isRead) params.append('isRead', String(isRead))
        return {
          url: `v1/notifications/?sortBy=notifyAt&pageSize=10${params.toString()}`,
        }
      },
    }),
  }),
})

export const { useGetNotificationQuery } = notificationsApi
