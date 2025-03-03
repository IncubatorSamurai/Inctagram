import { baseApi } from '@/shared/api/baseApi'
import { MeResponse } from '@/shared/api/auth/authApi.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),
  }),
})

export const { useMeQuery } = authApi
