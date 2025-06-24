import { baseApi } from '@/shared/api/baseApi'
import { SessionsGet } from './devicesApiType'

export const sessionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getDevices: build.query<SessionsGet, void>({
      query: () => ({
        url: 'v1/sessions',
      }),
    }),
    deleteAllSessions: build.mutation<void, void>({
      query: () => ({
        url: 'v1/sessions/terminate-all',
        method: 'DELETE'
      }),
    }),
  }),
})

export const { useDeleteAllSessionsMutation, useGetDevicesQuery } = sessionApi
