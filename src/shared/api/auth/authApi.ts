import { baseApi } from '../baseApi'

export type RegistrationRequest = {
  userName: string
  email: string
  password: string
  baseUrl: string
}

export type RegistrationErrorResponse = {
  statusCode: number
  data: {
    messages: [
      {
        message: string
        field: string
      },
    ]
  }
  error: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    registration: builder.mutation<RegistrationErrorResponse, RegistrationRequest>({
      query: body => ({
        url: 'v1/auth/registration',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useRegistrationMutation } = authApi
