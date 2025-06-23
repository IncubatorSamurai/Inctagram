import { baseApi } from '../baseApi'

export const deviceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
	//TODO: Алексей назвови метод getAllDevices, или поменяй у меня в deleteSingleDevice
    getAllDevices: builder.query<any, any>({
      query: () => `v1/sessions`,
    }),
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
  }),
})
export const { useGetAllDevicesQuery, useDeleteSingleDeviceMutation } = deviceApi
