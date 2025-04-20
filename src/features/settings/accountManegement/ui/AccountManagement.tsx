import { useState } from 'react'
import { useGetCurrentPaymentSubsQuery } from '@/shared/api/subscriptions/subscriptionsApi'
import { AccountType } from './AccountType'
import { CurrentSubs } from './CurrnetSubs'
import { SubsCost } from './SubsCosts'

export const AccountManagement = () => {
  const { data, isLoading } = useGetCurrentPaymentSubsQuery()
  const isActiveSubs = data?.data.length
  console.log(data?.data)

  const accountTypes = [
    { value: 'personal', label: 'Personal', id: 'personal', disabled: isActiveSubs },
    { value: 'business', label: 'Business', id: 'business' },
  ]

  const [accountState, setAccountState] = useState(
    !isActiveSubs ? accountTypes[1].value : accountTypes[0].value
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {!!isActiveSubs && <CurrentSubs currentPaymentSubs={data} />}
      <AccountType
        activeSubs={!!isActiveSubs}
        accountState={accountState}
        setAccountState={setAccountState}
      />
      {accountState === accountTypes[1].value && <SubsCost />}
    </div>
  )
}
