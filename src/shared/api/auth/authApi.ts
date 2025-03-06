import { baseApi } from '@/shared/api/baseApi'

import {
  GoogleAuthResponse,
  LoginAnswer,
  Login,
  ResendEmail,
  CheckRecoveryCodeResponse,
  MeResponse,
  RegistrationRequest,
} from './authApi.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => ({
        url: 'v1/auth/me',
      }),
    }),
    login: build.mutation<LoginAnswer, Login>({
      query: payload => ({
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
      query: payload => ({
        url: 'v1/auth/registration-email-resending',
        method: 'POST',
        body: payload,
      }),
    }),
    googleLogin: build.mutation<GoogleAuthResponse, { redirectUrl: string; code: string }>({
      query: payload => ({
        url: 'v1/auth/google/login',
        method: 'POST',
        body: payload,
      }),
    }),
    createNewPassword: build.mutation<void, { newPassword: string; recoveryCode: string }>({
      query: payload => ({
        url: 'v1/auth/new-password',
        method: 'POST',
        body: payload,
      }),
    }),
    checkRecoveryCode: build.mutation<CheckRecoveryCodeResponse, string>({
      query: recoveryCode => ({
        url: 'v1/auth/check-recovery-code',
        method: 'POST',
        body: { recoveryCode },
      }),
    }),
    resendRecoveryCode: build.mutation<void, { email: string; baseUrl: string }>({
      query: payload => ({
        url: 'v1/auth/password-recovery-resending',
        method: 'POST',
        body: payload,
      }),
    }),
    registration: build.mutation<void, RegistrationRequest>({
      query: payload => {
        return {
          url: 'v1/auth/registration',
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
  useCreateNewPasswordMutation,
  useCheckRecoveryCodeMutation,
  useResendRecoveryCodeMutation,
  useRegistrationMutation,
  useMeQuery,
} = authApi
