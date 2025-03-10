import { Mutex } from 'async-mutex'
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

const mutex = new Mutex()

const baseQueryWithAccessToken = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    const accessToken = localStorage.getItem('access_token')

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQueryWithAccessToken(args, api, extraOptions)

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQueryWithAccessToken(
          { method: 'POST', url: 'v1/auth/update-tokens' },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          const responseData = refreshResult.data as { accessToken: string }
          localStorage.setItem('access_token', responseData.accessToken)
          result = await baseQueryWithAccessToken(args, api, extraOptions)
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQueryWithAccessToken(args, api, extraOptions)
    }
  }

  return result
}
