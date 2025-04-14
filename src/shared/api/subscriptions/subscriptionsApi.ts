import { baseApi } from '@/shared/api/baseApi'
import { CostOfPaymentSubs, PaymentSubs } from '@/shared/api/subscriptions/subscriptionsApi.types'

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentPaymentSubs: builder.query<PaymentSubs, void>({
      query: () => ({
        url: 'v1/subscriptions/current-payment-subscriptions',
      }),
    }),
    getCostOfPaymentSubs: builder.query<CostOfPaymentSubs, void>({
      query: () => ({
        url: 'v1/subscriptions/cost-of-payment-subscriptions',
      }),
    }),
  }),
})

export const { useGetCurrentPaymentSubsQuery, useGetCostOfPaymentSubsQuery } = subscriptionApi
