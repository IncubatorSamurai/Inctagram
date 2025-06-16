export type MyPayments = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  price: number
  subscriptionType: string
  paymentType: string
}

export type SubscriptionBody = {
  typeSubscription: 'DAY' | 'WEEKLY' | 'MONTHLY' | undefined
  paymentType: string
  amount: number
  baseUrl: string
}

export type SubscriptionUrl = {
  url: string
}
