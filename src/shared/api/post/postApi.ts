import { baseApi } from '@/shared/api/baseApi'
import {
  PublicPostsRequest,
  PublicPostsResponse,
  UploadPhotoRespond,
} from '@/shared/api/post/postApi.types'

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    uploadPhoto: build.mutation<UploadPhotoRespond, FormData>({
      query: formData => ({
        url: 'v1/posts/image',
        method: 'POST',
        body: formData,
      }),
    }),

    getPublicPosts: build.query<PublicPostsResponse, PublicPostsRequest>({
      query: ({ endCursorPostId, pageSize, sortBy, sortDirection }) => ({
        url: `v1/public-posts/all`,
        method: 'GET',
        params: {
          ...(endCursorPostId ? { endCursorPostId } : {}),
          pageSize,
          sortBy,
          sortDirection,
        },
      }),
    }),
  }),
})

export const { useUploadPhotoMutation, useGetPublicPostsQuery } = postApi
