import { baseApi } from '@/shared/api/baseApi'
import { UploadAvatarResponse } from '@/shared/api/profile/profileApi.types'


export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    uploadUserAvatar: build.mutation<UploadAvatarResponse, FormData>({
      query: formData => ({
        url: 'v1/users/profile/avatar',
        method: 'POST',
        body: formData,
      }),
    }),

    deleteUserAvatar: build.mutation<void, void>({
      query: () => ({
        url: `v1/users/profile/avatar`,
        method: 'DELETE',
      }),
    }),

  }),
})

export const {
 useDeleteUserAvatarMutation,useUploadUserAvatarMutation
} = profileApi
