import { baseApi } from '../baseApi'

export const deviceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    //TODO: Алексей назвови метод getAllDevices, или поменяй у меня в deleteSingleDevice & deleteAllDevices
 
    deleteSingleDevice: builder.mutation<void, number>({
      query: id => ({ url: `v1/sessions/${id}`, method: 'DELETE' }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          deviceApi.util.updateQueryData('getAllDevices', {}, draft => {
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
    deleteAllDevices: builder.mutation<void, void>({
      query: () => ({ url: `v1/sessions/terminate-all`, method: 'DELETE' }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          deviceApi.util.updateQueryData('getAllDevices', {}, draft => {
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
export const { useGetAllDevicesQuery, useDeleteSingleDeviceMutation, useDeleteAllDevicesMutation } =
  deviceApi
