'use client'
import React, { useEffect, useState } from 'react'
import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/card'
import s from './SubsCost.module.scss'
import { RadioGroups } from '@/shared/ui/radio-groups'
import { useTranslations } from 'next-intl'
import { useGetCostOfPaymentSubsQuery } from '@/shared/api/subscriptions/subscriptionsApi'
import { useSubscriptionsMutation } from '@/shared/api/payments/paymentsApi'

import { Button } from '@/shared/ui/button'
import { PayPal } from '@/shared/assets/icons/PayPal'
import { Stripe } from '@/shared/assets/icons/Stripe'
import { Modal } from '@/shared/ui/modal'
import { Checkbox } from '@/shared/ui/checkbox/Checkbox'
import { useAbsoluteUrl } from '@/shared/hooks/useFullUrl'

export const SubsCost = () => {
  const t = useTranslations('profile.profileSettingsTabs')

  const { data: subsCosts, isLoading } = useGetCostOfPaymentSubsQuery()
  const newBaseUrl = useAbsoluteUrl()
  const [subscribe] = useSubscriptionsMutation()
  useEffect(() => {
    if (subsCosts?.data.length) {
      const first = subsCosts.data[0]
      setSelectedSubscription({
        amount: first.amount,
        typeDescription: first.typeDescription,
      })
    }
  }, [subsCosts])
  const onClose = () => {
    savePyamenthandler('')
    setAgreeChek(false)
  }
  const [agreeCheck, setAgreeChek] = useState(false)

  const [paymentType, setPaymentType] = useState('')
  const savePyamenthandler = (value: string) => {
    setPaymentType(value)
  }

  const [selectedSubscription, setSelectedSubscription] = useState<{
    amount: number
    typeDescription: 'DAY' | 'WEEKLY' | 'MONTHLY' | undefined
  } | null>(null)

  const handleSubscribe = async (paymentType: string) => {
    if (!selectedSubscription) {
      return
    }
    try {
      const body = {
        typeSubscription: selectedSubscription?.typeDescription,
        paymentType: paymentType,
        amount: selectedSubscription?.amount,
        baseUrl: newBaseUrl,
      }
      console.log(body)

      const response = await subscribe(body).unwrap()
      if (response.url) {
        window.location.href = response.url
      }
    } catch (error) {
      console.error('Subscription error:', error)
    }
  }

  if (isLoading || !subsCosts) {
    return <div>{t('Loading')}</div>
  }

  const costs = subsCosts?.data.map(item => {
    let label: string

    switch (item.typeDescription) {
      case 'DAY':
        label = `$${item.amount} per 1 Day`
        break
      case 'WEEKLY':
        label = `$${item.amount} per 7 Day`
        break
      case 'MONTHLY':
        label = `$${item.amount} per month`
        break
      default:
        label = `$${item.amount}`
    }
    return {
      value: String(item.amount),
      label,
      id: String(item.amount),
    }
  })
  const disabledButton = !agreeCheck

  return (
    <>
      <Typography variant={'h3'}>{t('cost')}</Typography>
      <Card className={s.accountCostContainer}>
        <RadioGroups
          defaultValue={String(subsCosts.data[0].amount)}
          options={costs}
          className={s.radioGroup}
          onValueChange={value => {
            const typeSubscr = subsCosts.data.find(d => d.amount === Number(value))?.typeDescription
            setSelectedSubscription({ amount: Number(value), typeDescription: typeSubscr })
          }}
        />
      </Card>
      <div className={s.paymentSystemsContainer}>
        <Card className={s.payment}>
          <Button variant="text" onClick={() => savePyamenthandler('PAYPAL')}>
            <PayPal />
          </Button>
        </Card>
        <Typography variant="regular_text_14">{t('Or')}</Typography>
        <Card className={s.payment}>
          <Button variant="text" onClick={() => savePyamenthandler('STRIPE')}>
            <Stripe />
          </Button>
        </Card>
      </div>
      <Modal
        open={!!paymentType}
        onOpenChange={onClose}
        title={t('CreatePayment')}
        className={s.agreeToPayModal}
      >
        <div className={s.content}>
          <Typography variant="regular_text_16">{t('labelModal')}</Typography>
          <div className={s.checkboxBtnGroup}>
            <Checkbox
              id="1"
              label={t('IAgree')}
              checked={agreeCheck}
              onChange={value => setAgreeChek(value)}
            />
            <Button
              variant="primary"
              onClick={() => handleSubscribe(paymentType)}
              disabled={disabledButton}
            >
              {t('Ok')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
