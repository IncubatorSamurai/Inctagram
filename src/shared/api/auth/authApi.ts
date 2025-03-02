import { baseApi } from '@/shared/api/baseApi'
import { LoginAnswerType, LoginType, ResendEmailType } from './authApi.type'

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
    confirmEmail: build.mutation<void, string>({
      query: confirmationCode => ({
        url: 'v1/auth/registration-confirmation',
        method: 'POST',
        body: {
          confirmationCode,
        },
      }),
    }),
    resendEmail: build.mutation<void, ResendEmailType>({
      query: ({ email, baseUrl }) => ({
        url: 'v1/auth/registration-email-resending',
        method: 'POST',
        body: {
          email,
          baseUrl,
        },
      }),
    }),
  }),
})

export const { useLoginMutation, useConfirmEmailMutation, useResendEmailMutation } = authApi
