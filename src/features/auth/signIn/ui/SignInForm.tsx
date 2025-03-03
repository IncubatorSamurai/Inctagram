'use client'
import { Link, useRouter } from '@/i18n/routing'
import { useLoginMutation } from '@/shared/api/auth/authApi'
import { PATH } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Typography } from '@/shared/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SignInSchema, SignInSchemaData } from '../model/schema'
import s from './SignInForm.module.scss'
import { ErrorResponse } from '@/shared/types/auth'

export const SignInForm = () => {
  const [errorMessage, setEmailMessage] = useState('')
  const [login, { data, error }] = useLoginMutation()

  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<SignInSchemaData>({
    mode: 'onTouched',
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { errors: validateError, isValid } = formState

  useEffect(() => {
    if (data?.accessToken) {
      router.push('/home')
      return
    }

    const errorMessage = error as ErrorResponse<string>
    setEmailMessage(errorMessage?.data?.messages || validateError?.email?.message || '')
  }, [error, validateError, data?.accessToken])

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
