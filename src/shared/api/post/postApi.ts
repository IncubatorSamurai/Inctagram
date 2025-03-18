import { baseApi } from '@/shared/api/baseApi'
import {
  GetPostsByNameArgs,
  GetPostsByNameRespond,
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
    getPostsByUserName: build.query<GetPostsByNameRespond, GetPostsByNameArgs>({
      query: ({ userName, ...params }) => ({
        params,
        url: `v1/posts/${userName}`,
      }),
    }),
  }),
})

export const {
  useUploadPhotoMutation,
  useGetPostsByUserNameQuery,
  useLazyGetPostsByUserNameQuery,
} = postApi
