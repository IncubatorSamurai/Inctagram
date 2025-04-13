import React, { useState } from 'react'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import { Card } from '@/shared/ui/card'
import s from './styles.module.scss'
import { RadioGroups } from '@/shared/ui/radio-groups'

export const AccountTypes = () => {
  const t = useTranslations('profile.profileSettingsTabs')
  const accountTypes = [
    { value: 'personal', label: 'Personal', id: 'personal' },
    { value: 'business', label: 'Business', id: 'business' },
  ]
  const costs = [
    { value: '10per1', label: '$10 per 1 Day', id: '10per1' },
    { value: '50per7', label: '$50 per 7 Day', id: '50per7' },
    { value: '100perMonth', label: '$100 per month', id: '100perMonth' },
  ]
  const [accountState, setAccountState] = useState(accountTypes[0].value)
  const [subCost, setSubCost] = useState(costs[0].value)

  return (
    <div>
      <div>
        <Typography variant={'h3'}>{t('accountType')}</Typography>
        <Card className={s.accountTypeContainer}>
          <RadioGroups
            options={accountTypes}
            className={s.radioGroup}
            defaultValue={accountState}
            onValueChange={type => {
              console.log(type)
              setAccountState(type)
            }}
          />
        </Card>
        {accountState === accountTypes[1].value && (
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
              or
              <Card className={s.payment}>Strip</Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
