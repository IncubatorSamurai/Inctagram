import { useCanceledAutoRenewalMutation } from '@/shared/api/subscriptions/subscriptionsApi'
import { PaymentSubs } from '@/shared/api/subscriptions/subscriptionsApi.types'
import { Card } from '@/shared/ui/card'
import { Checkbox } from '@/shared/ui/checkbox'
import { Typography } from '@/shared/ui/typography'
import { parseIsoDate } from '@/shared/utils'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import s from './CurrentSubs.module.scss'

type Props = {
  currentPaymentSubs: PaymentSubs
}

export const CurrentSubs = ({ currentPaymentSubs }: Props) => {
  const t = useTranslations('profile.profileSettingsTabs')
  const { data, hasAutoRenewal } = currentPaymentSubs

  const [isAutoRenewal, setIsAutoRenewal] = useState(false)
  const [canceledAutoRenewal, { isLoading }] = useCanceledAutoRenewalMutation()

  useEffect(() => {
    setIsAutoRenewal(hasAutoRenewal || localStorage.getItem('isAutoRenewal') === 'true')
  }, [hasAutoRenewal])

  const handleCheckboxOnChange = (isChecked: boolean) => {
    if (!isChecked) {
      if (hasAutoRenewal) {
        canceledAutoRenewal()
          .unwrap()
          .then(() => {
            setIsAutoRenewal(false)
            localStorage.removeItem('isAutoRenewal')
          })
          .catch(e => {
            console.error('failed to disable auto-renewal: ', e)
          })
      } else {
        setIsAutoRenewal(false)
        localStorage.removeItem('isAutoRenewal')
      }
    } else {
      localStorage.setItem('isAutoRenewal', 'true')
      setIsAutoRenewal(true)
    }
  }

  return (
    <>
      <Typography variant={'h3'}>{t('currentSubs')}</Typography>
      {data.map(({ subscriptionId, endDateOfSubscription, autoRenewal }) => {
        const formattedEndDate = parseIsoDate(endDateOfSubscription)
        const isShowNextPayment =
          autoRenewal || (isAutoRenewal && data[data.length - 1].subscriptionId === subscriptionId)

        return (
          <Card className={s.subsContainer} key={subscriptionId}>
            <div className={s.expire}>
              <Typography variant={'medium_text_14'}>{t('expireAt')}</Typography>
              <Typography variant={'bold_text_14'}>{formattedEndDate}</Typography>
            </div>
            {isShowNextPayment && (
              <div className={s.nextPayment}>
                <Typography variant={'medium_text_14'}>{t('nextPayment')}</Typography>
                <Typography variant={'bold_text_14'}>{formattedEndDate}</Typography>
              </div>
            )}
          </Card>
        )
      })}
      <Checkbox
        checked={isAutoRenewal}
        onChange={handleCheckboxOnChange}
        id={'autoRenewal'}
        label={t('autoRenewal')}
        className={s.autoRenewal}
        disabled={isLoading}
      />
    </>
  )
}
