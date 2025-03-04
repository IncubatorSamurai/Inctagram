import { baseApi } from '@/shared/api/baseApi'
import { GoogleAuthResponse, LoginAnswer, Login, ResendEmail, MeResponse } from './authApi.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
     me: build.query<MeResponse, void>({
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),
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
  }),
})

export const {
  useLoginMutation,
  useConfirmEmailMutation,
  useResendEmailMutation,
  useGoogleLoginMutation,
  useMeQuery,
} = authApi