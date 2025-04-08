import { baseApi } from '@/shared/api/baseApi'
import { CreatePostArgs, CreatePostResponse, UploadImageForPostResponse } from './postApi.types'


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
    
    })
  }),
})

export const { useCreatePostMutation, useUploadImageForPostMutation } = postsApi
