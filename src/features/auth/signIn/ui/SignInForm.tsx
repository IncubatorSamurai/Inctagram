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
import { PATH } from '@/shared/config/routes'

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

  useEffect(() => {
    fetch('https://inctagram.work/api/v1/auth/registration', {
      method: 'POST', // Добавляем метод POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'dasdasdsdfs',
        email: 'innominatamse@gmail.com',
        password: 'Ex4sdmple!',
        baseUrl: 'http://localhost:3000',
      }),
    })
  }, [])

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
        <Link href={PATH.FORGOTPASSWORD} className={s.link}>
          <Typography className={s.linkTitle}>Forgot Password</Typography>
        </Link>
        <Button fullWidth={true} disabled={!isValid}>
          Sign In
        </Button>
      </div>
    </form>
  )
}
