'use client'

import { useRouter } from '@/i18n/routing'
import { useCheckRecoveryCodeMutation } from '@/shared/api/auth/authApi'
import { PATH } from '@/shared/config/routes'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const RecoveryPage = () => {
  const [checkRecoveryCode, { isLoading }] = useCheckRecoveryCodeMutation()
  const searchParams = useSearchParams()
  const router = useRouter()

  const recoveryCode = searchParams.get('code')
  const email = searchParams.get('email')

  useEffect(() => {
    if (!recoveryCode || !email) {
      console.error('invalid password recovery link')
      router.push(PATH.SIGNIN)
      return
    }

    checkRecoveryCode(recoveryCode)
      .unwrap()
      .then(() => {
        router.push(`${PATH.NEW_PASSWORD}?code=${recoveryCode}`)
      })
      .catch(() => {
        router.push(`${PATH.LINK_EXPIRED}?email=${email}`)
      })
  }, [recoveryCode, email])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return null
}
