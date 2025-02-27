'use client'
import { Input } from '@/shared/ui/input'
import { useForm } from 'react-hook-form'
import s from './LinkExpiredForm.module.scss'
import { Button } from '@/shared/ui/button'

import { emailValidationScheme, ForgotArgsData } from '@/shared/schemas/emailValidationScheme'
import { zodResolver } from '@hookform/resolvers/zod'
import { useResendEmailMutation } from '@/shared/api/auth/authApi'
import { useEffect, useState } from 'react'
import { ResendEmailErrorType } from '@/shared/types/auth/auth'
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/config/routes'

export const LinkExpiredForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [resendEmail, { isSuccess, error }] = useResendEmailMutation()

  const { register, handleSubmit, formState } = useForm<ForgotArgsData>({
    resolver: zodResolver(emailValidationScheme),
    mode: 'onTouched',
    defaultValues: { email: '' },
  })

  const { isValid } = formState
  const router = useRouter()

  useEffect(() => {
    if (isSuccess) {
      router.push(PATH.SIGNIN)
      return
    }
    if (error) {
      const errorMessage = error as ResendEmailErrorType
      const { data } = errorMessage

      setErrorMessage(data.messages[0].message)
    }
  }, [error, isSuccess])
  const onSubmit = (data: ForgotArgsData) => {
    resendEmail({ email: data?.email, baseUrl: 'http://localhost:3000/auth' })
  }
  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')} label="Email" error={errorMessage} />
      <Button fullWidth={true} className={s.button} disabled={!isValid}>
        Resend verification link
      </Button>
    </form>
  )
}
