import { baseApi } from '@/shared/api/baseApi'
import { MyPayments } from '@/shared/api/payments/paymentsApi.types'

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyPayments: builder.query<MyPayments[], void>({
      query: () => ({ url: `v1/subscriptions/my-payments` }),
    }),
  }),
})

export const { useGetMyPaymentsQuery } = paymentsApi
