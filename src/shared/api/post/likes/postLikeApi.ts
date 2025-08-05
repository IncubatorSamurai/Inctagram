import { baseApi } from '../../baseApi'
import { PostLike, PostLikeRequest, PostLikesStatus } from './postLikeApi.types'

export const postLikeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPostLikes: build.query<PostLike, PostLikeRequest>({
      query: ({ postId, ...params }) => ({
        url: `v1/posts/${postId}/likes`,
        params,
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.search || ''}-${queryArgs.postId}`
      },
      merge: (currentCacheData, newItems, { arg }) => {
        if (arg.pageNumber === 1) return newItems
        return { ...newItems, items: [...currentCacheData.items, ...newItems.items] }
      },
      providesTags: (res, error, { postId }) => {
        return res ? [{ type: 'PostLikes', id: postId }] : ['PostLikes']
      },
    }),
    likeStatus: build.mutation<void, PostLikesStatus>({
      query: ({ id, likeStatus }) => ({
        url: `v1/posts/${id}/like-status`,
        method: 'PUT',
        body: {
          likeStatus,
        },
      }),
      invalidatesTags: (res, error, { id }) => {
        return [{ type: 'PostLikes', id: id }]
      },
    }),
  }),
})
export const { useGetPostLikesQuery, useLikeStatusMutation, useLazyGetPostLikesQuery } = postLikeApi
