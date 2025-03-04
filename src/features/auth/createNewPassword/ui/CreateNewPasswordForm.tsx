'use client'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Typography } from '@/shared/ui/typography'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './CreateNewPasswordForm.module.scss'
import clsx from 'clsx'
import { createNewPasswordFormSchema, passwordSchema } from '@/shared/schemas/passwordSchema'
import { useCreateNewPasswordMutation } from '@/shared/api/auth/authApi'
import { useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { PATH } from '@/shared/config/routes'
import { useEffect } from 'react'

export const CreateNewPasswordForm = () => {
  const [createNewPassword, { isLoading, isSuccess }] = useCreateNewPasswordMutation()

  const searchParams = useSearchParams()
  const router = useRouter()

  const recoveryCode = searchParams.get('code') as string

  useEffect(() => {
    if (!recoveryCode) {
      console.error('invalid email')
      router.push(PATH.SIGNIN)
    }
  }, [recoveryCode])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<createNewPasswordFormSchema>({
    resolver: zodResolver(passwordSchema),
    mode: 'onTouched',
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit: SubmitHandler<createNewPasswordFormSchema> = data => {
    createNewPassword({ newPassword: data.confirmPassword, recoveryCode }).then(() => {
      router.push(PATH.SIGNIN)
    })
  }

  if (isLoading || isSuccess) {
    return <div>Loading...</div>
  }

  return (
    <Card className={s.card}>
      <Typography variant="h1" className={s.title}>
        Create New Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="password"
          label="New password"
          placeholder="******************"
          {...register('newPassword')}
          error={errors.newPassword?.message}
        />

        <Input
          type="password"
          label="Password confirmation"
          placeholder="******************"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          className={clsx(!errors.newPassword?.message && s.inputConfirmationPassword)}
        />

        <Typography variant="regular_text_14" className={s.description}>
          Your password must be between 6 and 20 characters
        </Typography>

        <Button fullWidth disabled={!isValid} type="submit" className={s.button}>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
