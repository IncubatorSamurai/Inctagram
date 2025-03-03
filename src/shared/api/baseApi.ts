import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      prepareHeaders: headers => {
        headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
      },
    })(args, api, extraOptions)

    return result
  },

  endpoints: () => ({}),
})
