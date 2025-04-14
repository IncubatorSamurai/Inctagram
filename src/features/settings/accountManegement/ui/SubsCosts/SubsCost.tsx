import React from 'react'
import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/card'
import s from './SubsCost.module.scss'
import { RadioGroups } from '@/shared/ui/radio-groups'
import { useTranslations } from 'next-intl'
import { useGetCostOfPaymentSubsQuery } from '@/shared/api/subscriptions/subscriptionsApi'

export const SubsCost = () => {
  const t = useTranslations('profile.profileSettingsTabs')
  const { data: subsCosts, isLoading } = useGetCostOfPaymentSubsQuery()

  if (isLoading || !subsCosts) {
    return <div>Loading...</div>
  }

  const costs = subsCosts?.data.map(({ amount, typeDescription }) => {
    let label: string

    switch (typeDescription) {
      case 'DAY':
        label = `$${amount} per 1 Day`
        break
      case 'WEEKLY':
        label = `$${amount} per 7 Day`
        break
      case 'MONTHLY':
        label = `$${amount} per month`
        break
      default:
        label = `$${amount}`
    }

    return {
      value: String(amount),
      label,
      id: String(amount),
    }
  })

  return (
    <>
      <Typography variant={'h3'}>{t('cost')}</Typography>
      <Card className={s.accountCostContainer}>
        <RadioGroups
          options={costs}
          className={s.radioGroup}
          onValueChange={cost => console.log(cost)}
        />
      </Card>
      <div className={s.paymentSystemsContainer}>
        <Card className={s.payment}>PayPal</Card>
        Or
        <Card className={s.payment}>Strip</Card>
      </div>
    </>
  )
}
