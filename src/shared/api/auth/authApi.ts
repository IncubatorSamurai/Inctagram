import { baseApi } from '@/shared/api/baseApi'
import { GoogleAuthResponse, LoginAnswer, Login, ResendEmail } from './authApi.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginAnswer, Login>({
      query: (payload) => ({
        url: 'v1/auth/login',
        method: 'POST',
        body: payload,
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
    resendEmail: build.mutation<void, ResendEmail>({
      query: (payload) => ({
        url: 'v1/auth/registration-email-resending',
        method: 'POST',
        body: payload,
      }),
    }),
    googleLogin: build.mutation<GoogleAuthResponse, { redirectUrl: string; code: string }>({
      query: payload => {
        return {
          url: 'v1/auth/google/login',
          method: 'POST',
          body: payload,
        }
      },
    }),
    passwordRecovery: build.mutation<void, { email: string; recaptcha: string; baseUrl: string }>(
      {
        query: ({ email, recaptcha, baseUrl }) => ({
          url: '/v1/auth/password-recovery',
          method: 'POST',
          body: { email, recaptcha, baseUrl },
        }),
      }
    ),

  }),
})

export const {
  useLoginMutation,
  useConfirmEmailMutation,
  useResendEmailMutation,
  useGoogleLoginMutation,
  usePasswordRecoveryMutation
} = authApi

