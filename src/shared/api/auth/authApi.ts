import { baseApi } from '@/shared/api/baseApi'
import {
  GoogleLoginResponse,
  GoogleLoginArgs,
  LoginResponse,
  LoginArgs,
  ResendEmailArgs,
  PasswordRecoveryArgs,
  CheckRecoveryCodeResponse,
  MeResponse,
  RegistrationRequest,
  CreateNewPasswordArgs,
  ResendRecoveryCodeArgs,
} from './authApi.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    me: build.query<MeResponse, void>({
      query: () => ({
        url: 'v1/auth/me',
      }),
      providesTags: ['Me'],
    }),
    login: build.mutation<LoginResponse, LoginArgs>({
      query: payload => ({
        url: 'v1/auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'v1/auth/logout',
        method: 'POST',
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
    resendEmail: build.mutation<void, ResendEmailArgs>({
      query: payload => ({
        url: 'v1/auth/registration-email-resending',
        method: 'POST',
        body: payload,
      }),
    }),
    googleLogin: build.mutation<GoogleLoginResponse, GoogleLoginArgs>({
      query: payload => ({
        url: 'v1/auth/google/login',
        method: 'POST',
        body: payload,
      }),
    }),
    createNewPassword: build.mutation<void, CreateNewPasswordArgs>({
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
    resendRecoveryCode: build.mutation<void, ResendRecoveryCodeArgs>({
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
    passwordRecovery: build.mutation<void, PasswordRecoveryArgs>({
      query: payload => ({
        url: '/v1/auth/password-recovery',
        method: 'POST',
        body: payload,
      }),
    }),
})
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
  usePasswordRecoveryMutation,
  useLogoutMutation,
} = authApi
