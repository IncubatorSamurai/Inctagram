export type Sub = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  autoRenewal: boolean
}

export type PaymentSubs = {
  data: Sub[]
  hasAutoRenewal: boolean
}

export type PaymentCost = {
  amount: number
  typeDescription: 'DAY' | 'WEEKLY' | 'MONTHLY'
}

export type CostOfPaymentSubs = {
  data: PaymentCost[]
}
