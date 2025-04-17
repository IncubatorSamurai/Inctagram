'use client'
import React, { useEffect, useState } from 'react'
import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/card'
import s from './SubsCost.module.scss'
import { RadioGroups } from '@/shared/ui/radio-groups'
import { useTranslations } from 'next-intl'
import { useGetCostOfPaymentSubsQuery } from '@/shared/api/subscriptions/subscriptionsApi'
import { useSubscriptionsMutation } from '@/shared/api/payments/paymentsApi'
import { PATH } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import { PayPal } from '@/shared/assets/icons/PayPal'
import { Stripe } from '@/shared/assets/icons/Stripe'

export const SubsCost = () => {
  const t = useTranslations('profile.profileSettingsTabs')
  const { data: subsCosts, isLoading } = useGetCostOfPaymentSubsQuery()
  const [subscribe] = useSubscriptionsMutation()

  useEffect(() => {
    if (subsCosts) {
      setSelectedSubscription(costs[0].originalData)
    }
  }, [subsCosts])

  const [paymentType, setPaymentType] = useState('')
  const setPaymentHandler = (type: string) => {
    setPaymentType(type)
    handleSubscribe()
  }

  const [selectedSubscription, setSelectedSubscription] = useState<{
    amount: number
    typeDescription: string
    label: string
  } | null>(null)

  const handleSubscribe = async () => {
    if (!selectedSubscription) {
      return
    }
    try {
      const body = {
        typeSubscription: selectedSubscription?.typeDescription,
        paymentType: paymentType,
        amount: selectedSubscription?.amount,
        baseUrl: PATH.MYPROFILE,
      }
      console.log(body)

      const response = await subscribe(body).unwrap()
      if (response.url) {
        window.location.href = response.url
      }
    } catch (error) {
      console.error('Subscription error:', error)
    }
  }

  if (isLoading || !subsCosts) {
    return <div>Loading...</div>
  }

  const costs = subsCosts?.data.map(item => {
    let label: string

    switch (item.typeDescription) {
      case 'DAY':
        label = `$${item.amount} per 1 Day`
        break
      case 'WEEKLY':
        label = `$${item.amount} per 7 Day`
        break
      case 'MONTHLY':
        label = `$${item.amount} per month`
        break
      default:
        label = `$${item.amount}`
    }
    return {
      value: String(item.amount),
      label,
      id: String(item.amount),
      originalData: {
        amount: item.amount,
        typeDescription: item.typeDescription,
        label,
      },
    }
  })

  return (
    <>
      <Typography variant={'h3'}>{t('cost')}</Typography>
      <Card className={s.accountCostContainer}>
        <RadioGroups
          defaultValue={String(subsCosts.data[0].amount)}
          options={costs}
          className={s.radioGroup}
          onValueChange={value => {
            const selected = costs.find(opt => opt.value === value)
            if (selected?.originalData) {
              setSelectedSubscription(selected.originalData)
            }
          }}
        />
      </Card>
      <div className={s.paymentSystemsContainer}>
        <Card className={s.payment}>
          <Button variant="text" onClick={() => setPaymentHandler('PAYPAL')}>
            <PayPal />
          </Button>
        </Card>
        Or
        <Card className={s.payment}>
          <Button variant="text" onClick={() => setPaymentHandler('STRIPE')}>
            <Stripe />
          </Button>
        </Card>
      </div>
    </>
  )
}
