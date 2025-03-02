import { baseApi } from '@/shared/api/baseApi'
import { GoogleAuthResponse } from './authApi.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    googleLogin: build.mutation<GoogleAuthResponse, { redirectUrl: string; code: string }>({
      query: payload => {
        return {
          method: 'POST',
          url: 'v1/auth/google/login',
          body: payload,
        }
      },
    }),
  }),
})

export const { useGoogleLoginMutation } = authApi


