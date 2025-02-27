/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Typography } from '@/shared/ui/typography'
import s from './SignInForm.module.scss'
import { Link } from '@/i18n/routing'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInSchema, SignInSchemaData } from '../model/types'
import { useLoginMutation } from '@/shared/api/auth/authApi'
import { useEffect } from 'react'

export const SignInForm = () => {
  const [login, { error }] = useLoginMutation()

  const { register, handleSubmit, formState } = useForm<SignInSchemaData>({
    mode: 'onBlur',
    resolver: zodResolver(SignInSchema),
  })
  const { errors, isValid } = formState

  const onSubmit = (data: SignInSchemaData) => {
    login({ email: data.email, password: data.password })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log((error as any)?.data?.messages)
  useEffect(() => {
    fetch('https://inctagram.work/api/v1/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'tester',
        email: 'natalliasafarevich@gmail.com',
        password: 'Exd4mple!',
        baseUrl: 'http://localhost:3000/en/signin',
      }),
    }).then(a => console.log(a))
    // {
    //   "userName": "string",
    //   "email": "string",
    //   "password": "Ex4mple!",
    //   "baseUrl": "http://localhost:3000"
    // }
  }, [])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email')}
        error={errors?.email?.message || (error as any)?.data?.messages}
        className={s.input}
        label="Email"
        placeholder="Epam@epam.com"
      />
      <Input
        {...register('password')}
        error={errors?.password?.message}
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
