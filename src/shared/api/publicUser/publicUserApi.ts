import { baseApi } from '@/shared/api/baseApi'
import {
  GetPublicProfileArgs,
  ProfileUserResponse,
  PublicUserResponse,
} from '@/shared/api/publicUser/publicUserApi.types'

export const publicUserApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicProfile: builder.query<ProfileUserResponse, GetPublicProfileArgs>({
      query: ({ profileId }) => ({ url: `v1/public-user/profile/${profileId}` }),
    }),
    getTotalUsers: builder.query<PublicUserResponse, void>({
      query: () => ({ url: `v1/public-user` }),
    }),
  }),
})

export const { useGetPublicProfileQuery } = publicUserApi
