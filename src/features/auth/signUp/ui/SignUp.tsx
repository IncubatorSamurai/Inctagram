'use client'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card/Card'
import { Input } from '@/shared/ui/input'
import { Typography } from '@/shared/ui/typography'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import s from './SignUp.module.scss'
import { Checkbox } from '@/shared/ui/checkbox'

import { AuthWidget } from '@/widgets/authWidget/ui/AuthWidget'
import { Link } from '@/i18n/routing'
import { passwordSchema } from '@/shared/schemes/createNewPasswordFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailValidationScheme } from '@/shared/schemes/emailValidationScheme'
import { z } from 'zod'

export const SignUpSchem = z.object({
  name: z
    .string()
    .min(6, {
      message: `Minimum number of characters 6`,
    })
    .max(30, {
      message: `Minimum number of characters 30`,
    })
    .regex(/^[a-zA-Z0-9_-]+$/),
  agree: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms',
  }),
})

const combinedSchema = z.intersection(passwordSchema, emailValidationScheme)
const actualCombine = z.intersection(combinedSchema, SignUpSchem)

export type FormSignUP = z.infer<typeof actualCombine>

export const SignUpForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormSignUP>({
    resolver: zodResolver(actualCombine),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      newPassword: '',
      confirmPassword: '',
      agree: false,
    },
  })

  const onSubmit: SubmitHandler<FormSignUP> = data => {
    console.log(data)
    reset()
  }

  const {
    field: { value, onChange },
  } = useController({
    name: 'agree',
    control,
    defaultValue: false,
  })

  return (
    <Card className={s.root}>
      <div className={s.wrapper}>
        <Typography variant="h1" className={s.text}>
          Sign Up
        </Typography>
        <AuthWidget />
        <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
          <Input
            label="Name"
            type="name"
            placeholder="User name"
            {...register('name', { required: true })}
            error={errors.name?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="email@gmail.com"
            {...register('email', { required: true })}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="******************"
            {...register('newPassword')}
            error={errors.newPassword?.message}
          />

          <Input
            label="Password confirmation"
            type="password"
            placeholder="******************"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Checkbox
            id="check"
            {...register('agree')}
            onChange={onChange}
            checked={value}
            labelForText="small_text"
            label={
              <p>
                I agree to the <Link href={'/#'}>Terms of Service</Link> and{' '}
                <Link href={'/#'}>Privacy Policy</Link>
              </p>
            }
          />
          <Button fullWidth disabled={!isValid}>
            Sign Up
          </Button>
        </form>
        <Typography variant="regular_text_14" className={s.padding}>
          Do you have an account?
        </Typography>
        <Button fullWidth variant="text" className={s.margin}>
          <Link className={s.linkStyles} href={'/signin'}>
            Sign In
          </Link>
        </Button>
      </div>
    </Card>
  )
}
