import { baseApi } from '@/shared/api/baseApi'
import { ProfileResponse } from './profileApi.types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileResponse, void>({
      query: () => ({
        url: 'v1/users/profile',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetProfileQuery } = profileApi
