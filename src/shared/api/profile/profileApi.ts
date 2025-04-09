import { baseApi } from '@/shared/api/baseApi'
import { ProfileResponse, ProfileUpdateRequest } from './profileApi.types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileResponse, void>({
      query: () => ({
        url: 'v1/users/profile',
        method: 'GET',
      }),
    }),
    updateProfile: build.mutation<void, ProfileUpdateRequest>({
      query: data => ({
        url: 'v1/users/profile',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi
