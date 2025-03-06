'use client'

import { SubmitHandler, useController, useForm } from 'react-hook-form'

import { passwordSchema } from '@/shared/schemas/passwordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailValidationScheme } from '@/shared/schemas/emailValidationScheme'
import { z } from 'zod'

import { useState } from 'react'
import { ErrorResponse } from '@/shared/types/auth'
import { useRegistrationMutation } from '@/shared/api/auth/authApi'
import { RegistrationRequest } from '@/shared/api/auth/authApi.types'
import { catchFormError } from '@/shared/hooks/useCatchFormError'
import { SignUpNameSchema } from '../schemas/signUpSchemas/signUpNameSchema'
import { SignUpAgreeSchema } from '../schemas/signUpSchemas/signUpAgreeScema'



type DataFormReq = {
    name: string
    email: string
    newPassword: string
    agree: boolean
  }

// export const SignUpSchem = z.object({
//     name: z
//       .string()
//       .min(6, {
//         message: `Minimum number of characters 6`,
//       })
//       .max(30, {
//         message: `Minimum number of characters 30`,
//       })
//       .regex(/^[a-zA-Z0-9_-]+$/),
//     agree: z.boolean().refine(val => val === true, {
//       message: 'You must agree to the terms',
//     }),
//   })
  
//   const combinedSchema = z.intersection(passwordSchema, emailValidationScheme)
//   const secondCombine = z.intersection(combinedSchema, SignUpSchem)
//   const actualCombine = z.intersection(secondCombine, SignUpSchem)
const NameAgree = SignUpNameSchema.merge(SignUpAgreeSchema)
const NameAgreeEmail = NameAgree.merge(emailValidationScheme)
const actualSchema = z.intersection(NameAgreeEmail,passwordSchema)
  
export type FormSignUP = z.infer<typeof actualSchema>

export const useSignUpForm = () => {
    const [open, setOpen] = useState(false);
    const [registration, { isLoading, isError }] = useRegistrationMutation();

    const {
      control,
      register,
      handleSubmit,
      setError,
      watch,
      reset,
      formState: { errors, isValid },
    } = useForm<FormSignUP>({
      resolver: zodResolver(actualSchema),
      mode: 'onTouched',
      defaultValues: {
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
        agree: false,
      },
    });
  
    const disabled = !isValid;
  
    const onSubmit: SubmitHandler<FormSignUP> = async (dataForm: DataFormReq) => {
      try {
        const registrationData: RegistrationRequest = {
          userName: dataForm.name,
          password: dataForm.newPassword,
          baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}v1/auth/registration`,
          email: dataForm.email,
        };
         await registration(registrationData).unwrap();
        setOpen(true);
      } catch (error) {
        const err = error as ErrorResponse;
        catchFormError(err, setError);
      }
    };
  
    const {
      field: { value, onChange },
    } = useController({
      name: 'agree',
      control,
      defaultValue: false,
    });
  
    const email = watch('email');
  
    return {
      open,
      setOpen,
      isLoading,
      isError,
      control,
      register,
      handleSubmit,
      errors,
      disabled,
      onSubmit,
      value,
      onChange,
      email,
      reset
    };
  };