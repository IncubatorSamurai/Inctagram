import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/card'
import s from './AccountType.module.scss'
import { RadioGroups } from '@/shared/ui/radio-groups'
import { useTranslations } from 'next-intl'

type Props = {
  activeSubs: boolean
  accountState: string
  setAccountState: (state: string) => void
}

export const AccountType = ({ activeSubs, accountState, setAccountState }: Props) => {
  const accountTypes = [
    { value: 'personal', label: 'Personal', id: 'personal', disabled: activeSubs },
    { value: 'business', label: 'Business', id: 'business' },
  ]
  const t = useTranslations('profile.profileSettingsTabs')

  return (
    <>
      <Typography variant={'h3'}>{t('accountType')}</Typography>
      <Card className={s.accountTypeContainer}>
        <RadioGroups
          options={accountTypes}
          className={s.radioGroup}
          value={accountState}
          onValueChange={type => {
            setAccountState(type)
          }}
        />
      </Card>
    </>
  )
}
