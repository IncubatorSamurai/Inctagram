import { baseApi } from '@/shared/api/baseApi'
import { GoogleAuthResponse, LoginAnswer, Login, ResendEmail } from './authApi.types'
import { ErrorResponse } from '@/shared/types/auth';

export type RegistrationRequest = {
  userName: string
  email: string
  password: string
  baseUrl: string
}

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
    registration: build.mutation<ErrorResponse, RegistrationRequest>({
      query: body => ({
        url: 'v1/auth/registration',
        method: 'POST',
        body,
      }),
    })
  }),
})

export const {
  useLoginMutation,
  useConfirmEmailMutation,
  useResendEmailMutation,
  useGoogleLoginMutation,
  useRegistrationMutation,
} = authApi

