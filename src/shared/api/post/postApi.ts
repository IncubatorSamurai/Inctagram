import { baseApi } from '@/shared/api/baseApi'
import {
  CreatePostArgs,
  CreatePostResponse,
  PostId,
  DeleteImageForPostArgs,
  UploadImageForPostResponse,
  GetPostsByNameArgs,
  GetPostsByNameRespond,
  Name,
  PostDescriptionChange,
  ResponseGetById,
  ResponseGetByName,
} from './postApi.types'

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
    getPostByName: build.mutation<ResponseGetByName, Name>({
      query: ({ name }) => ({
        url: `v1/posts/${name}`,
        method: 'GET',
      }),
    }),
    deleteImageForPost: build.mutation<void, DeleteImageForPostArgs>({
      query: ({ uploadId }) => ({
        url: `v1/posts/image/${uploadId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useUploadImageForPostMutation,
  useGetPostsByUserNameQuery,
  useDeletePostMutation,
  useEditPostDescriptionMutation,
  useGetPostByIdQuery,
  useGetPostByNameMutation,
  useDeleteImageForPostMutation,
} = postsApi
