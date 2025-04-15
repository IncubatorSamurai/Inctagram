import React from 'react'
import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/card'
import s from './CurrentSubs.module.scss'
import { Checkbox } from '@/shared/ui/checkbox'
import { useTranslations } from 'next-intl'

type Props = {
  autoRenewal: boolean
  setAutoRenewal: (state: boolean) => void
}

export const CurrentSubs = ({ autoRenewal, setAutoRenewal }: Props) => {
  const t = useTranslations('profile.profileSettingsTabs')

  return (
    <>
      <Typography variant={'h3'}>{t('currentSubs')}</Typography>
      <Card className={s.subsContainer}>
        <div className={s.expire}>
          <Typography variant={'medium_text_14'}>{t('expireAt')}</Typography>
          <Typography variant={'bold_text_14'}>12.02.2022</Typography>
        </div>
        <div className={s.nextPayment}>
          <Typography variant={'medium_text_14'}>{t('nextPayment')}</Typography>
          <Typography variant={'bold_text_14'}>13.02.2022</Typography>
        </div>
      </Card>
      <Checkbox
        checked={autoRenewal}
        onChange={setAutoRenewal}
        id={'autoRenewal'}
        label={t('autoRenewal')}
        className={s.autoRenewal}
      />
    </>
  )
}
