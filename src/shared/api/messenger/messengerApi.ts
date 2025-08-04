'use client'

import { baseApi } from '@/shared/api/baseApi'
import SocketApi from '@/shared/api/sokets/soket'
import {
  GetLatestMessagesParams,
  GetMessagesByUserParams,
  Message,
  MessageDeleteParams,
  MessengerListResponse,
} from './messengerApiType'

export const messengerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLatestMessages: builder.query<MessengerListResponse, GetLatestMessagesParams>({
      query: params => ({
        url: `v1/messenger`,
        method: 'GET',
        params,
      }),
      // Фильтрация битых чатов сразу после получения данных
      transformResponse: (response: MessengerListResponse) => ({
        ...response,
        items: response.items.filter(chat => {
          return chat.userName?.trim() && (chat.ownerId != null || chat.receiverId != null)
        }),
      }),
      merge: (currentCache, newData) => {
        // Новые чаты ставим впереди
        const combined = [...newData.items, ...currentCache.items]
        const uniqueMap = new Map<number, Message>()

        for (const item of combined) {
          const chatKey =
            item.ownerId === Number(localStorage.getItem('userId')) ? item.receiverId : item.ownerId

          if (chatKey) {
            if (!uniqueMap.has(chatKey)) {
              uniqueMap.set(chatKey, item)
            } else {
              const existing = uniqueMap.get(chatKey)!
              if (new Date(item.createdAt) > new Date(existing.createdAt)) {
                uniqueMap.set(chatKey, item)
              }
            }
          }
        }

        // Превращаем в массив, чтобы новые были в начале
        currentCache.items = Array.from(uniqueMap.values())
        currentCache.pageSize = newData.pageSize
        currentCache.totalCount = newData.totalCount
        currentCache.notReadCount = newData.notReadCount
      },
      providesTags: ['ChatHistory'],
    }),
    updateMessageStatus: builder.mutation<void, number[]>({
      query: ids => ({
        url: 'v1/messenger',
        method: 'PUT',
        body: { ids: ids },
      }),
    }),

    getMessagesByUser: builder.query<MessengerListResponse, GetMessagesByUserParams>({
      query: ({ dialoguePartnerId, ...params }) => ({
        url: `v1/messenger/${dialoguePartnerId}`,
        method: 'GET',
        params,
      }),
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

          const currentUserId = Number(localStorage.getItem('userId'))
          const userId = Number(dialoguePartnerId)

          const handleMessage = (message: Message) => {
            const isRelevant =
              (message.ownerId === currentUserId && message.receiverId === userId) ||
              (message.ownerId === userId && message.receiverId === currentUserId)

            if (!isRelevant) return

            updateCachedData(draft => {
              const exists = draft.items.some(m => m.id === message.id)
              if (exists) {
                draft.items = draft.items.map(m => (m.id === message.id ? message : m))
              } else {
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

          // Подписка
          ws.subscribeReceiveMessage(handleMessage)
          ws.subscribeMessageSend(handleMessage)
          ws.subscribeMessageUpdate(handleMessage)
          ws.subscribeMessageDeleted(handleDelete)

          // Отписка при размонтировании кэша
          await cacheEntryRemoved
        } catch (error) {
          console.error('[messengerApi] WebSocket error:', error)
        }
      },
    }),

    deleteMessage: builder.mutation<void, MessageDeleteParams>({
      query: ({ id, ...params }) => ({
        url: `v1/messenger/${id}`,
        method: 'DELETE',
        params,
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
  useGetMessagesByUserQuery,
  useUpdateMessageStatusMutation,
  useDeleteMessageMutation,
} = messengerApi
