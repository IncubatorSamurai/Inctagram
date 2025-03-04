'use client'

import { LinkExpired } from '@/features/auth'
import { useRouter } from '@/i18n/routing'
import { useResendRecoveryCodeMutation } from '@/shared/api/auth/authApi'
import { PATH } from '@/shared/config/routes'
import { ErrorResponse } from '@/shared/types/auth'
import { Button } from '@/shared/ui/button'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import s from './LinkExpiredPage.module.scss'

export const LinkExpiredPage = () => {
  const [resendRecoveryCode, { isLoading, isError }] = useResendRecoveryCodeMutation()
  const searchParams = useSearchParams()
  const router = useRouter()

  const email = searchParams.get('email')

  useEffect(() => {
    if (!email) {
      console.error('invalid email')
      router.push(PATH.SIGNIN)
    }
  }, [email])

  const resendLinkHandler = async () => {
    try {
      await resendRecoveryCode({
        email: email as string,
        baseUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}`,
      }).unwrap()
      // TODO openModal then router.push(PATH.SIGNIN)
    } catch (error) {
      const errorMessage = error as ErrorResponse
      console.error(errorMessage.data.messages[0].message)
    }

    router.push(PATH.SIGNIN)
  }

  if (isError || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <LinkExpired>
      <Button className={s.resendButton} onClick={resendLinkHandler}>
        Resend link
      </Button>
    </LinkExpired>
  )
}
