import { baseApi } from '@/shared/api/baseApi'
import {
  CommentResponse,
  CommentsResponse,
  CreateComment,
  CreatePostArgs,
  CreatePostResponse,
  DeleteImageForPostArgs,
  GetCommentsByPostIdArgs,
  GetPostsByNameArgs,
  GetPostsByNameRespond,
  PostDescriptionChange,
  PostId,
  ResponseGetById,
  // ResponseGetByName,
  UploadImageForPostResponse,
} from './postApi.types'
import { publicPostApi } from './publicPosts'

export const postsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createPost: build.mutation<CreatePostResponse, CreatePostArgs>({
      query: payload => ({
        url: 'v1/posts',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Post'],
    }),
    getCommentsByPostId: build.query<CommentsResponse, GetCommentsByPostIdArgs>({
      query: ({ postId, ...params }) => ({
        url: `v1/posts/${postId}/comments`,
        method: 'GET',
        params,
      }),
      providesTags: ['Comments'],
    }),
    uploadImageForPost: build.mutation<UploadImageForPostResponse, FormData>({
      query: formData => ({
        url: 'v1/posts/image',
        method: 'POST',
        body: formData,
      }),
    }),
    getPostsByUserName: build.query<GetPostsByNameRespond, GetPostsByNameArgs>({
      query: ({ userName, ...params }) => ({
        params,
        url: `v1/posts/${userName}`,
      }),
    }),
    deletePost: build.mutation<void, PostDescriptionChange>({
      query: ({ id }) => ({
        url: `v1/posts/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({id}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          publicPostApi.util.updateQueryData('getPublicPostsByUserId', undefined, draft => {
            return draft.items.filter(post => post.id !== id)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    }),
    editPostDescription: build.mutation<void, PostDescriptionChange>({
      query: ({ id, description }) => ({
        url: `v1/posts/${id}`,
        method: 'PUT',
        body: { description },
      }),
      invalidatesTags: ['Post'],
    }),
    getPostById: build.query<ResponseGetById, PostId>({
      query: ({ id }) => ({
        url: `v1/posts/id/${id}`,
      }),
      providesTags: ['Post'],
    }),
    deleteImageForPost: build.mutation<void, DeleteImageForPostArgs>({
      query: ({ uploadId }) => ({
        url: `v1/posts/image/${uploadId}`,
        method: 'DELETE',
      }),
    }),
    addComment: build.mutation<CommentResponse, CreateComment>({
      query: payload => ({
        url: `v1/posts/${payload.postId}/comments`,
        method: 'POST',
        body: { content: payload.content },
      }),
      invalidatesTags:["Comments"]
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetCommentsByPostIdQuery,
  useUploadImageForPostMutation,
  useGetPostsByUserNameQuery,
  useDeletePostMutation,
  useEditPostDescriptionMutation,
  useGetPostByIdQuery,
  useDeleteImageForPostMutation,
  useAddCommentMutation,
} = postsApi
