import { baseApi } from '@/shared/api/baseApi'
import SocketApi from '@/shared/api/sokets/soket'
import { Message, MessageSendRequest } from './messengerApiType'

export type MessengerListResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: Message[]
}

export const messengerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLatestMessages: builder.query<
      MessengerListResponse,
      { cursor?: number; pageSize?: number; searchName?: string }
    >({
      query: ({ cursor, pageSize = 12, searchName }) => {
        const params = new URLSearchParams()
        if (cursor) params.append('cursor', cursor.toString())
        if (pageSize) params.append('pageSize', pageSize.toString())
        if (searchName) params.append('searchName', searchName)

        return {
          url: `v1/messenger?${params.toString()}`,
          method: 'GET',
        }
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newData) => {
        currentCache.items.push(...newData.items)
        currentCache.pageSize = newData.pageSize
        currentCache.totalCount = newData.totalCount
        currentCache.notReadCount = newData.notReadCount
      },
    }),

    getMessagesByUser: builder.query<
      MessengerListResponse,
      { dialoguePartnerId: number; cursor?: number; pageSize?: number }
    >({
      query: ({ dialoguePartnerId, cursor, pageSize = 12 }) => {
        const params = new URLSearchParams()
        if (cursor) params.append('cursor', cursor.toString())
        if (pageSize) params.append('pageSize', pageSize.toString())

        return {
          url: `v1/messenger/${dialoguePartnerId}?${params.toString()}`,
          method: 'GET',
        }
      },
      transformResponse: (response: MessengerListResponse) => ({
        ...response,
        items: response.items.reverse(),
      }),
      async onCacheEntryAdded(
        { dialoguePartnerId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = SocketApi.getInstance()

        try {
          await cacheDataLoaded

          const handleReceive = (message: Message) => {
            updateCachedData(draft => {
              const index = draft.items.findIndex(m => m.id === message.id)
              if (index !== -1) {
                draft.items[index] = message
              } else if (
                message.ownerId === dialoguePartnerId ||
                message.receiverId === dialoguePartnerId
              ) {
                draft.items.push(message)
                draft.totalCount += 1
              }
            })
          }

          const handleDelete = (deletedId: number) => {
            updateCachedData(draft => {
              draft.items = draft.items.filter(m => m.id !== deletedId)
              draft.totalCount -= 1
            })
          }

          ws.subscribeReceiveMessage(handleReceive)
          ws.subscribeMessageUpdate(handleReceive)
          ws.subscribeMessageDeleted(handleDelete)
          ws.subscribeMessageSend(handleReceive)
        } catch (e) {
          console.error('Socket error:', e)
        }

        await cacheEntryRemoved
        ws.disconnect()
      },
    }),

    updateMessageStatus: builder.mutation<void, number[]>({
      query: ids => ({
        url: 'v1/messenger',
        method: 'PUT',
        body: {
          ids,
        },
      }),
    }),

    sendMessage: builder.mutation<Message, MessageSendRequest>({
      async queryFn(body) {
        const ws = SocketApi.getInstance()
        return new Promise(resolve => {
          ws.sendMessage(body, data => {
            resolve({ data: data.message })
          })
        })
      },
    }),

    deleteMessage: builder.mutation<void, { id: number; dialoguePartnerId: number }>({
      query: ({ id }) => ({
        url: `v1/messenger/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ id, dialoguePartnerId }, { dispatch, queryFulfilled, getState }) {
        const patchMessages = dispatch(
          messengerApi.util.updateQueryData('getMessagesByUser', { dialoguePartnerId }, draft => {
            draft.items = draft.items.filter(m => m.id !== id)
            draft.totalCount -= 1
          })
        )

        try {
          await queryFulfilled

          const state = getState()
          const remainingMessages =
            messengerApi.endpoints.getMessagesByUser.select({ dialoguePartnerId })(state)?.data
              ?.items || []

          if (remainingMessages.length === 0) {
            dispatch(
              messengerApi.util.updateQueryData('getLatestMessages', { pageSize: 12 }, draft => {
                draft.items = draft.items.filter(
                  m => m.ownerId !== dialoguePartnerId && m.receiverId !== dialoguePartnerId
                )
                draft.totalCount -= 1
              })
            )
          }
        } catch {
          patchMessages.undo()
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const {
  useGetLatestMessagesQuery,
  useLazyGetMessagesByUserQuery,
  useUpdateMessageStatusMutation,
  useDeleteMessageMutation,
  useSendMessageMutation,
} = messengerApi
