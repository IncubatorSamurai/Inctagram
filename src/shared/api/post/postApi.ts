import { baseApi } from '@/shared/api/baseApi'
import { Name, PostDescriptionChange, ResponseGetById, ResponseGetByName, UploadPhotoRespond } from '@/shared/api/post/postApi.types'

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    uploadPhoto: build.mutation<UploadPhotoRespond, FormData>({
      query: formData => ({
        url: 'v1/posts/image',
        method: 'POST',
        body: formData,
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
      query: ({id}) => ({
        url: `v1/posts/id/${id}`,
        method: 'GET'
      })
    }),
    getPostByName: build.mutation<ResponseGetByName,Name>({
      query: ({name}) => ({
        url: `v1/posts/${name}`,
        method: 'GET'
      })
    })
  }),
})

export const { useUploadPhotoMutation, useDeletePostMutation, useEditPostDescriptionMutation, useGetPostByIdMutation, useGetPostByNameMutation } =
  postApi
