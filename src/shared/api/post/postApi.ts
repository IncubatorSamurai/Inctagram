import { baseApi } from '@/shared/api/baseApi'
import { UploadPhotoRespond } from '@/shared/api/post/postApi.types'

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    uploadPhoto: build.mutation<UploadPhotoRespond, FormData>({
      query: (formData) => ({
        url: 'v1/posts/image',
        method: 'POST',
        body: formData,
      }),

    }),
    }),
})

export const {
useUploadPhotoMutation
} = postApi
