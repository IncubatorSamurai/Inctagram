import { baseApi } from '../../baseApi'
import { PostLike, PostLikesStatus } from './postLikeApi.types'

export const postLikeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPostLikes: build.query<PostLike, number>({
      query: id => ({
        url: `v1/posts/${id}/likes`,
      }),
      providesTags: ['PostLikes'],
    }),
    likeStatus: build.mutation<void, PostLikesStatus>({
      query: ({ id, likeStatus }) => ({
        url: `v1/posts/${id}/like-status`,
        method: 'PUT',
        body: {
          likeStatus,
        },
      }),
      invalidatesTags: ['PostLikes'],
    }),
    
  }),
})
export const { useGetPostLikesQuery, useLikeStatusMutation } = postLikeApi
