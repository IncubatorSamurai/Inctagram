import { baseApi } from '@/shared/api/baseApi'
import { GetPostsByUserIdArgs, GetPostsByUserIdRespond } from '@/shared/api/post/postApi.types'

export const publicPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPublicPostsByUserId: build.query<GetPostsByUserIdRespond, GetPostsByUserIdArgs>({
      query: ({ userId, endCursorPostId, ...params }) => ({
        params,
        url: `v1/public-posts/user/${userId}/${endCursorPostId ?? ''}`,
      }),
    }),
  }),
})

export const { useGetPublicPostsByUserIdQuery, useLazyGetPublicPostsByUserIdQuery } = publicPostApi
