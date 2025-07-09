import { useEffect, useState } from 'react'
import { useGetCurrentPaymentSubsQuery } from '@/shared/api/subscriptions/subscriptionsApi'
import { AccountType } from './AccountType'
import { CurrentSubs } from './CurrnetSubs'
import { SubsCost } from './SubsCosts'
import { Loader } from '@/shared/ui/loader'
import s from './AccountManagement.module.scss'

export const AccountManagement = () => {
  const { data, isLoading } = useGetCurrentPaymentSubsQuery()
  const isActiveSubs = data?.data.length

  const accountTypes = [
    { value: 'personal', label: 'Personal', id: 'personal', disabled: isActiveSubs },
    { value: 'business', label: 'Business', id: 'business' },
  ]

  const [accountState, setAccountState] = useState(accountTypes[0].value)

  useEffect(() => {
    const activeAccountType = data && isActiveSubs ? accountTypes[1].value : accountTypes[0].value
    setAccountState(activeAccountType)
  }, [data])

  if (isLoading) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    )
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
