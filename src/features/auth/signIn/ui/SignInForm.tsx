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

export const SignInForm = () => {
  const [login] = useLoginMutation()

  const { register, handleSubmit, formState } = useForm<SignInSchemaData>({
    mode: 'onBlur',
    resolver: zodResolver(SignInSchema),
  })
  const { errors, isValid } = formState

  const onSubmit = (data: SignInSchemaData) => {
    login({ email: data.email, password: data.password })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email')}
        error={errors?.email?.message}
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
