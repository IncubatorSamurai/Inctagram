import { baseApi } from '@/shared/api/baseApi'
import { GetPostsByUserIdArgs, GetPostsByUserIdRespond } from '@/shared/api/post/postApi.types'

export const publicPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPublicPostsByUserId: build.query<GetPostsByUserIdRespond, GetPostsByUserIdArgs>({
      query: ({ userId, endCursorPostId, ...params }) => ({
        params,
        url: `v1/posts/user/${userId}/${endCursorPostId ?? ''}`,
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.userId
      },
      merge: (currentCacheData, newItems) => {
        const existingIds = new Set(currentCacheData.items.map(item => item.id))
        const uniqueNewItems = newItems.items.filter(item => !existingIds.has(item.id))
        currentCacheData.items.push(...uniqueNewItems)
      },
      keepUnusedDataFor: 0,
    }),
  }),
})

export const { useLazyGetPublicPostsByUserIdQuery } = publicPostApi
