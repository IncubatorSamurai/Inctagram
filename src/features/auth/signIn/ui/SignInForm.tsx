'use client'
import { Link } from '@/i18n/routing'
import { useLoginMutation } from '@/shared/api/auth/authApi'
import { ErrorType } from '@/shared/types/auth/auth'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Typography } from '@/shared/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SignInSchema, SignInSchemaData } from '../model/schema'
import s from './SignInForm.module.scss'

export const SignInForm = () => {
  const [errorMessage, setEmailMessage] = useState('')
  const [login, { error }] = useLoginMutation()

  const { register, handleSubmit, formState } = useForm<SignInSchemaData>({
    mode: 'onBlur',
    resolver: zodResolver(SignInSchema),
  })

  const { errors: validateError, isValid } = formState

  useEffect(() => {
    const errorMessage = error as ErrorType
    setEmailMessage(errorMessage?.data?.messages || validateError?.email?.message || '')
  }, [error, validateError])

  const onSubmit = (data: SignInSchemaData) => {
    login({ email: data.email, password: data.password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email')}
        error={errorMessage}
        className={s.input}
        label="Email"
        placeholder="Epam@epam.com"
      />
      <Input
        {...register('password')}
        error={validateError?.password?.message}
        label="Password"
        placeholder="**********"
        type="password"
      />
      <div className={s.box}>
        <Link href={'/forgotpassword'} className={s.link}>
          <Typography className={s.linkTitle}>Forgot Password</Typography>
        </Link>
        <Button fullWidth={true} disabled={!isValid}>
          Sign In
        </Button>
      </div>
    </form>
  )
}
