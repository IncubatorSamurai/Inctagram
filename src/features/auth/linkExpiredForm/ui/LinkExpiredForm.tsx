'use client'
import { useRouter } from '@/i18n/routing'
import { useResendEmailMutation } from '@/shared/api/auth/authApi'
import { PATH } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import s from './LinkExpiredForm.module.scss'
import { ErrorResponse } from '@/shared/types/auth'
import { LinkExpiredData, linkExpiredFormSchema } from '@/shared/schemes/linkExpiredFormSchema'

export const LinkExpiredForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [resendEmail, { isSuccess, error }] = useResendEmailMutation()

  const { register, handleSubmit, formState } = useForm<LinkExpiredData>({
    resolver: zodResolver(linkExpiredFormSchema),
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
      const errorMessage = error as ErrorResponse
      const { data } = errorMessage

      setErrorMessage(data.messages[0].message)
    }
  }, [router, error, isSuccess])

  const onSubmit = (data: LinkExpiredData) => {
    resendEmail({ email: data?.email, baseUrl: 'http://localhost:3000/auth/' })
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
