'use client'
import { useSearchParams } from 'next/navigation'
import { useConfirmEmailMutation } from '@/shared/api/auth/authApi'
import { useEffect } from 'react'
import { EmailVerify } from './EmailVerify/EmailVerify'
import { InvalidEmail } from './InvalidEmail/InvalidEmail'
import { useTranslations } from 'next-intl'

export const SignUpConfirmedPage = () => {
  const [confirmEmail, { isLoading, isUninitialized, isError }] = useConfirmEmailMutation()
  const tCommon = useTranslations('common')

  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  useEffect(() => {
    if (code) {
      confirmEmail(code)
    }
  }, [code])

  if (isUninitialized || isLoading) return <h1>{tCommon('loading')}</h1>

  return <>{isError ? <InvalidEmail /> : <EmailVerify />}</>
}
