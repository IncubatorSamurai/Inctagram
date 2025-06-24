import { baseApi } from '@/shared/api/baseApi'
import { GetPostsByUserIdArgs, GetPostsByUserIdRespond } from '@/shared/api/post/postApi.types'

export const publicPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPublicPostsByUserId: build.query<GetPostsByUserIdRespond, GetPostsByUserIdArgs>({
      query: ({ userId, endCursorPostId, ...params }) => ({
        params,
        url: `v1/public-posts/user/${userId}/${endCursorPostId ?? ''}`,
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.userId
      },
      merge: (currentCacheData, newItems) => {
        currentCacheData.items.push(...newItems.items)
      },
      keepUnusedDataFor: 0,
    }),
  }),
})

export const { useGetPublicPostsByUserIdQuery, useLazyGetPublicPostsByUserIdQuery } = publicPostApi
