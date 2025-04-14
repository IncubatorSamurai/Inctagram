import React, { useState } from 'react'
import { CurrentSubs } from '@/features/settings/accountManegement/ui/CurrnetSubs'
import { AccountType } from '@/features/settings/accountManegement/ui/AccountType'
import { SubsCost } from '@/features/settings/accountManegement/ui/SubsCosts/SubsCost'

export const AccountManagement = () => {
  const [activeSubs, setActiveSubs] = useState(true)
  const [autoRenewal, setAutoRenewal] = useState(true)
  const accountTypes = [
    { value: 'personal', label: 'Personal', id: 'personal', disabled: activeSubs },
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
      {activeSubs && <CurrentSubs autoRenewal={autoRenewal} setAutoRenewal={setAutoRenewal} />}
      <AccountType
        activeSubs={activeSubs}
        accountState={accountState}
        setAccountState={setAccountState}
      />
      {accountState === accountTypes[1].value && (
        <SubsCost subCost={subCost} setSubCost={setSubCost} />
      )}
    </div>
  )
}
