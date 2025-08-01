import { baseApi } from '../../baseApi'
import { PostLike, PostLikeRequest, PostLikesStatus } from './postLikeApi.types'

export const postLikeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPostLikes: build.query<PostLike, PostLikeRequest>({
      query: ({ id, search }) => ({
        url: `v1/posts/${id}/likes${search ? `?search=${search}` : ''}`,
      }),
      providesTags: ['PostLikes'],
    merge: (currentCacheData, newData, { arg }) => {
    if (arg.search) {
      alert(1)
      return newData // при фильтрации заменяем
    }
    return {
      ...newData,
      items: [...currentCacheData.items, ...newData.items],
    }
  }
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
export const { useGetPostLikesQuery, useLazyGetPostLikesQuery, useLikeStatusMutation } = postLikeApi
