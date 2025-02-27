import { baseApi } from '@/shared/api/baseApi'
import { LoginAnswerType, LoginType } from './authApi.type'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginAnswerType, LoginType>({
      query: ({ email, password }) => ({
        url: 'v1/auth/login',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
