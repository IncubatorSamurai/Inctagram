import { baseApi } from '@/shared/api/baseApi'
import {
  MyPayments,
  SubscriptionBody,
  SubscriptionUrl,
} from '@/shared/api/payments/paymentsApi.types'

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyPayments: builder.query<MyPayments[], void>({
      query: () => ({ url: `v1/subscriptions/my-payments` }),
    }),
    subscriptions: builder.mutation<SubscriptionUrl, SubscriptionBody>({
      query: payment => ({
        url: `v1/subscriptions`,
        method: 'POST',
        body: payment,
      }),
    }),
  }),
})

export const { useGetMyPaymentsQuery, useSubscriptionsMutation } = paymentsApi
