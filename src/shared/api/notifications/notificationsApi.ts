import { baseApi } from '../baseApi'
import { NotificationsArg, NotificationsResponse } from './notificationsApi.types'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotification: builder.query<NotificationsResponse, NotificationsArg>({
      query: ({ isRead }) => {
        const params = new URLSearchParams()
        if (isRead) params.append('isRead', String(isRead))
        return {
          url: `v1/notifications/?sortBy=notifyAt&pageSize=10${params.toString()}`,
        }
      },
      providesTags: ['Notifications'],
    }),
    readNotifications: builder.mutation<void, number[]>({
      query: ids => ({
        url: 'v1/notifications/mark-as-read',
        method: 'PUT',
        body: {
          ids: ids,
        },
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
})

export const { useGetNotificationQuery, useReadNotificationsMutation } = notificationsApi
