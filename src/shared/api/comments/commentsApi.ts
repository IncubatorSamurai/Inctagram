import { baseApi } from '@/shared/api/baseApi'
import { CommentResponse, CreateComment } from './commentsApi.types'

export const commentsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    addComment: build.mutation<CommentResponse, CreateComment>({
      query: (payload) => ({
        url: `v1/posts/${payload.postId}/comments`,
        method: 'POST',
        body: { content: payload.content },
      }),
    }),
  }),
})

export const { useAddCommentMutation } = commentsApi
