'use client'

import { SubmitHandler, useController, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState } from 'react'
import { ErrorResponse } from '@/shared/types/auth'
import { useRegistrationMutation } from '@/shared/api/auth/authApi'
import { catchFormError } from '@/shared/hooks/useCatchFormError'

import { FormSignUP, signUpFormSchema } from '../schemes/signUpFormSchema'

type DataFormReq = {
  name: string
  email: string
  newPassword: string
  agree: boolean
}

export const useSignUpForm = () => {
  const [open, setOpen] = useState(false)
  const [registration, { isLoading, isError, isSuccess }] = useRegistrationMutation()

  const {
    control,
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormSignUP>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onTouched',
  })

  const isDisabled = !isValid || isLoading

  const onSubmit: SubmitHandler<FormSignUP> = async (dataForm: DataFormReq) => {
    try {
      const registrationData = {
        userName: dataForm.name,
        password: dataForm.newPassword,
        baseUrl: window.location.origin,
        email: dataForm.email,
      }
      await registration(registrationData).unwrap()
      setOpen(true)
    } catch (error) {
      const err = error as ErrorResponse
      catchFormError(err, setError)
    }
  }

  const {
    field: { value, onChange },
  } = useController({
    name: 'agree',
    control,
    defaultValue: false,
  })

  const email = watch('email') // check rerender
  useEffect(() => {
    if (isSuccess && !open) {
      reset()
    }
  }, [isSuccess, open])

  return {
    open,
    setOpen,
    isLoading,
    isError,
    control,
    register,
    handleSubmit,
    errors,
    isDisabled,
    onSubmit,
    value,
    onChange,
    email,
    reset,
  }
}
