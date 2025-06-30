import { baseApi } from '@/shared/api/baseApi'
import { SessionsGet } from './devicesApiType'

export const sessionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getDevices: build.query<SessionsGet, void>({
      query: () => ({
        url: 'v1/sessions',
      }),
    }),

    deleteSingleDevice: build.mutation<void, number>({
      query: id => ({ url: `v1/sessions/${id}`, method: 'DELETE' }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          sessionApi.util.updateQueryData('getDevices', undefined, draft => {
            draft.others = draft.others.filter(item => item.deviceId !== id)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    deleteAllDevices: build.mutation<void, void>({
      query: () => ({ url: `v1/sessions/terminate-all`, method: 'DELETE' }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          sessionApi.util.updateQueryData('getDevices', undefined, draft => {
            draft.others = []
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const { useDeleteAllDevicesMutation, useDeleteSingleDeviceMutation, useGetDevicesQuery } =
  sessionApi
