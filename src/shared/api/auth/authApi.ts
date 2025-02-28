// import { baseApi } from '@/shared/api/baseApi'

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const authApi = baseApi.injectEndpoints({
//   endpoints: () => ({}),
// })


export type RegistrationRequest = {
  userName: string;
  email: string;
  password: string;
  baseUrl: string;
}


export type RegistrationErrorResponse = {
  statusCode: number,
  messages: [
    {
      message: string,
      field: string
    }
  ],
  error: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }), 
  endpoints: (builder) => ({
    registration: builder.mutation<RegistrationErrorResponse, RegistrationRequest>({
      query: (body) => ({
        url: 'v1/auth/registration',
        method: 'POST',
        body,
      }),
    }),
  }),
});


export const { useRegistrationMutation } = authApi;