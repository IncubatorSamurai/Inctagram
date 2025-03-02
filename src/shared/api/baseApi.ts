import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ErrorResponse } from './auth/authApi.types'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      prepareHeaders: headers => {
        headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      },
    })(args, api, extraOptions)

    if (result.error) {
      if (result.error.status === 400) {
        console.log((result.error.data as ErrorResponse).messages[0].message)
      }
    }

    return result
  },

  endpoints: () => ({}),
})
