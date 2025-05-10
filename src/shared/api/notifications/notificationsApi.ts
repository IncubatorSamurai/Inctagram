import SocketApi from '@/shared/api/sokets/soket'
import { baseApi } from '../baseApi'
import { NotificationItem, NotificationsArg, NotificationsResponse } from './notificationsApi.types'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNotification: builder.query<NotificationsResponse, NotificationsArg>({
      query: ({ isRead, cursor }) => {
        const params = new URLSearchParams()

        if (isRead) params.append('isRead', String(isRead))
        params.set('sortBy', 'notifyAt')
        params.set('sortDirection', 'desc')
        params.set('pageSize', '10')

        const cursorSegment = cursor ? `${cursor}` : ''
        return {
          url: `v1/notifications/${cursorSegment}?${params.toString()}`,
        }
      },
      serializeQueryArgs: () => 'getNotificationBase',

      merge: (currentCacheData, newItems) => {
        newItems.items.forEach(newItem => {
          currentCacheData.items.push(newItem)
        })
      },
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const ws = SocketApi.getInstance()
        try {
          await cacheDataLoaded
          const listener = (event: NotificationItem) => {
            const el: NotificationItem = {
              id: event.id,
              message: event.message,
              isRead: event.isRead,
              createdAt: event.createdAt,
            }
            updateCachedData(draft => {
              if (!el.isRead) {
                draft.items.unshift(el)
                draft.notReadCount += 1
              }
            })
          }

          ws.subscribeNotifications(listener)
        } catch {}
        await cacheEntryRemoved
        ws.disconnect()
      },
    }),
    readNotifications: builder.mutation<void, number[]>({
      query: ids => ({
        url: 'v1/notifications/mark-as-read',
        method: 'PUT',
        body: {
          ids: ids,
        },
      }),
      async onQueryStarted(ids, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          notificationsApi.util.updateQueryData('getNotification', {}, draft => {
            let newlyReadCount = 0
            draft.items.forEach(item => {
              if (ids.includes(item.id) && !item.isRead) {
                item.isRead = true
                newlyReadCount += 1
              }
            })
            draft.notReadCount -= newlyReadCount
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useGetNotificationQuery,
  useReadNotificationsMutation,
  useLazyGetNotificationQuery,
} = notificationsApi
