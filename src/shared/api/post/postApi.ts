import { baseApi } from '@/shared/api/baseApi'
import { CreatePostArgs, CreatePostResponse, UploadImageForPostResponse } from './postApi.types'
import {
  GetPostsByNameArgs,
  GetPostsByNameRespond,
  Name,
  PostDescriptionChange,
  ResponseGetById,
  ResponseGetByName,
} from '@/shared/api/post/postApi.types'

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
    }),
    getPostById: build.mutation<ResponseGetById, PostDescriptionChange>({
      query: ({ id }) => ({
        url: `v1/posts/id/${id}`,
        method: 'GET',
      }),
    }),
    getPostByName: build.mutation<ResponseGetByName, Name>({
      query: ({ name }) => ({
        url: `v1/posts/${name}`,
        method: 'GET',
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
  useGetPostByIdMutation,
  useGetPostByNameMutation,
} = postsApi
