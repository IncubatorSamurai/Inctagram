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
import { passwordSchema } from '@/shared/schemas/passwordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailValidationScheme } from '@/shared/schemas/emailValidationScheme'
import { z } from 'zod'
import {
  RegistrationErrorResponse,
  RegistrationRequest,
  useRegistrationMutation,
} from '@/shared/api/auth/authApi'
import { useState } from 'react'
import { SignUpModal } from './signUpModal/SignUpModal'




type DataFormReq = {
  name: string
  email: string
  newPassword: string
  agree: boolean
}

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

export type modal = {
  title: string
  message: string
}

export const SignUpForm = () => {
  const [modalContent, setModalContent] = useState<modal>({ title: '', message: '' })
  const [open, setOpen] = useState(false)
  const [registration, { isLoading, isError, error }] = useRegistrationMutation()
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

  const onSubmit: SubmitHandler<FormSignUP> = async (dataForm: DataFormReq) => {
    try {
      const registrationData: RegistrationRequest  = {
        userName: dataForm.name,
        password: dataForm.newPassword,
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}v1/auth/registration`,
        email: dataForm.email,
      }
      const res = await registration(registrationData).unwrap()
    
      setModalContent({
        title: 'Email sent',
        message: `We have sent a link to confirm your email to ${dataForm.email}`,
      })
      setOpen(true)
      } catch (error) {
      const err = error as RegistrationErrorResponse
      // setModalContent({
      //   title: 'Something wrong',
      //   message: err.data.messages[0].message,
      // })
      // setOpen(true)
      console.log(err)
    } 
   
   
  }
  const {
    field: { value, onChange },
  } = useController({
    name: 'agree',
    control,
    defaultValue: false,
  })

  // let nameError = ''
  // let emailError = ''
  // if(error?.data.statusCode === 400 && error?.data.messages[0].field === 'userName') {
  //   nameError =  error?.data.messages[0].message
  // }
  // if(error?.data.statusCode === 400 && error?.data.messages[0].field === 'email') {
  //   emailError =  error?.data.messages[0].message
  // }
 
  return (
    <>
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
                {...register('name')}
                error={errors.name?.message || nameError }
              />

              <Input
                label="Email"
                type="email"
                placeholder="email@gmail.com"
                {...register('email')}
                error={errors.email?.message || emailError}
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
              <Button fullWidth disabled={!isValid || isLoading}>
                {isLoading ? '...Loading' : 'Sign Up'}
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
          <SignUpModal error ={isError} email={modalContent} open={open} onReset={reset} onChange={()=>{setOpen(false)}}/>
      </Card>
    </>
  )
}
