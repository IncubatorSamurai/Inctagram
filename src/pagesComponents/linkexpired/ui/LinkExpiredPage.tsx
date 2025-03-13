'use client'
import { EmailSentModal, LinkExpired } from '@/features/auth'
import { useRouter } from '@/i18n/routing'
import { useResendRecoveryCodeMutation } from '@/shared/api/auth/authApi'
import { PATH } from '@/shared/config/routes'
import { ErrorResponse } from '@/shared/types/auth'
import { Button } from '@/shared/ui/button'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import s from './LinkExpiredPage.module.scss'
import { useTranslations } from 'next-intl'

export const LinkExpiredPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resendRecoveryCode, { isLoading, isSuccess }] = useResendRecoveryCodeMutation()
  const searchParams = useSearchParams()
  const router = useRouter()
  const tAuth = useTranslations('auth')
  const tCommon = useTranslations('common')

  const email = searchParams.get('email') as string

  const resendLinkHandler = async () => {
    try {
      await resendRecoveryCode({
        email: email,
        baseUrl: window.location.origin,
      }).unwrap()

      setIsModalOpen(true)
    } catch (error) {
      router.push(PATH.SIGNIN)

      const errorMessage = error as ErrorResponse
      console.error(errorMessage.data.messages[0].message)
    }
  }

  useEffect(() => {
    if (!email) {
      console.error('email is incorrect')
      router.push(PATH.SIGNIN)
    }
  }, [email])

  useEffect(() => {
    if (isSuccess && !isModalOpen) {
      router.push(PATH.SIGNIN)
    }
  }, [isSuccess, isModalOpen])

  return (
    <>
      <LinkExpired>
        <Button className={s.resendButton} onClick={resendLinkHandler} disabled={isLoading}>
          {isLoading ? tCommon('loading') : tAuth('resendLink')}
        </Button>
      </LinkExpired>
      <EmailSentModal email={email} open={isModalOpen} onChange={setIsModalOpen} />
    </>
  )
}
