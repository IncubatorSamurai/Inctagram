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

export const CreateNewPasswordForm = () => {
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
    console.log(data)
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
