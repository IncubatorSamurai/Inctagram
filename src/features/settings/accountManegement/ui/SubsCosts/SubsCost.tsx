import React from 'react'
import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/card'
import s from './SubsCost.module.scss'
import { RadioGroups } from '@/shared/ui/radio-groups'
import { useTranslations } from 'next-intl'

type Props = {
  subCost: string
  setSubCost: (state: string) => void
}

export const SubsCost = ({ subCost, setSubCost }: Props) => {
  const t = useTranslations('profile.profileSettingsTabs')
  const costs = [
    { value: '10per1', label: '$10 per 1 Day', id: '10per1' },
    { value: '50per7', label: '$50 per 7 Day', id: '50per7' },
    { value: '100perMonth', label: '$100 per month', id: '100perMonth' },
  ]

  return (
    <>
      <Typography variant={'h3'}>{t('cost')}</Typography>
      <Card className={s.accountCostContainer}>
        <RadioGroups
          options={costs}
          className={s.radioGroup}
          defaultValue={subCost}
          onValueChange={cost => setSubCost(cost)}
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
