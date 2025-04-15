import React, { useState } from 'react'
import { CurrentSubs } from '@/features/settings/accountManegement/ui/CurrnetSubs'
import { AccountType } from '@/features/settings/accountManegement/ui/AccountType'
import { useGetCurrentPaymentSubsQuery } from '@/shared/api/subscriptions/subscriptionsApi'
import { SubsCost } from '@/features/settings/accountManegement/ui/SubsCosts'

export const AccountManagement = () => {
  const { data } = useGetCurrentPaymentSubsQuery()
  const isActiveSubs = data?.data.length

  const [autoRenewal, setAutoRenewal] = useState(true)
  const accountTypes = [
    { value: 'personal', label: 'Personal', id: 'personal', disabled: isActiveSubs },
    { value: 'business', label: 'Business', id: 'business' },
  ]

  const [accountState, setAccountState] = useState(accountTypes[0].value)

  return (
    <div>
      {!!isActiveSubs && <CurrentSubs autoRenewal={autoRenewal} setAutoRenewal={setAutoRenewal} />}
      <AccountType
        activeSubs={!!isActiveSubs}
        accountState={accountState}
        setAccountState={setAccountState}
      />
      {accountState === accountTypes[1].value && <SubsCost />}
    </div>
  )
}
