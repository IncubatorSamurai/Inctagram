import { baseApi } from '@/shared/api/baseApi'
import {
  ProfileResponse,
  ProfileUpdateRequest,
  UploadAvatarResponse,
} from '@/shared/api/profile/profileApi.types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    uploadUserAvatar: build.mutation<UploadAvatarResponse, FormData>({
      query: formData => ({
        url: 'v1/users/profile/avatar',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Profile'],
    }),

    deleteUserAvatar: build.mutation<void, void>({
      query: () => ({
        url: `v1/users/profile/avatar`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
    getProfile: build.query<ProfileResponse, void>({
      query: () => ({
        url: 'v1/users/profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: build.mutation<void, ProfileUpdateRequest>({
      query: data => ({
        url: 'v1/users/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useDeleteUserAvatarMutation,
  useUploadUserAvatarMutation,
  useUpdateProfileMutation,
  useGetProfileQuery,
} = profileApi
