import { baseApi } from '@/shared/api/baseApi'
import {
  Answer,
  AnswersResponse,
  GetCommentLikesArg,
  GetCommentLikesResponse,
  GetCommentsAnswersArg,
  postAnswerCommentArg,
  UpdateCommentAnswersLikesArg,
  UpdateCommentLikesArg,
  UpdateCommentLikesResponse,
} from '@/shared/api/comments/commentsApi.types'
import { postsApi } from '@/shared/api/post/postApi'

export const commentsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getCommentLikes: build.query<GetCommentLikesResponse, GetCommentLikesArg>({
      query: ({ postId, commentId }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/likes`,
        method: 'GET',
      }),
      providesTags: ['Post'],
    }),
    getCommentAnswers: build.query<AnswersResponse, GetCommentsAnswersArg>({
      query: ({ postId, commentId }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/answers`,
        method: 'GET',
      }),
      providesTags: (result, error, { commentId }) => [{ type: 'CommentAnswers', id: commentId }],
    }),
    updateCommentLike: build.mutation<UpdateCommentLikesResponse, UpdateCommentLikesArg>({
      query: ({ postId, commentId, likeStatus }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/like-status`,
        method: 'PUT',
        body: { likeStatus },
      }),

      // ⬇️ OPTIMISTIC UPDATE только одного комментария
      async onQueryStarted({ postId, commentId, likeStatus }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getCommentsByPostId', { postId }, draft => {
            const comment = draft.items.find(c => c.id === commentId)
            if (comment) {
              comment.isLiked = likeStatus === 'LIKE'
              comment.likeCount += likeStatus === 'LIKE' ? 1 : -1
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo() // если ошибка — откат
        }
      },
    }),
    updateCommentAnswersLike: build.mutation<
      UpdateCommentLikesResponse,
      UpdateCommentAnswersLikesArg
    >({
      query: ({ postId, commentId, answerId, likeStatus }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
        method: 'PUT',
        body: { likeStatus },
      }),

      async onQueryStarted(
        { postId, commentId, likeStatus, answerId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          commentsApi.util.updateQueryData('getCommentAnswers', { postId, commentId }, draft => {
            const answer = draft.items.find(c => c.id === answerId)
            if (answer) {
              answer.isLiked = likeStatus === 'LIKE'
              answer.likeCount += likeStatus === 'LIKE' ? 1 : -1
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    postAnswerComment: build.mutation<Answer, postAnswerCommentArg>({
      query: ({ postId, commentId, content }) => ({
        url: `v1/posts/${postId}/comments/${commentId}/answers`,
        method: 'POST',
        body: { content },
      }),

      async onQueryStarted({ postId, commentId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postsApi.util.updateQueryData('getCommentsByPostId', { postId }, draft => {
            const comment = draft.items.find(c => c.id === commentId)
            if (comment) {
              comment.answerCount += 1
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (result, error, { commentId }) => [
        { type: 'CommentAnswers', id: commentId },
      ],
    }),
  }),
})

export const {
  useUpdateCommentLikeMutation,
  useLazyGetCommentAnswersQuery,
  useUpdateCommentAnswersLikeMutation,
  usePostAnswerCommentMutation,
} = commentsApi
