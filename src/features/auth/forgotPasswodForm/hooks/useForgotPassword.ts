import { useState, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePasswordRecoveryMutation } from '@/shared/api/auth/authApi'
import { emailValidationScheme, ForgotArgsData } from '@/shared/schemes/emailValidationScheme'
import { ErrorResponse } from '@/shared/types/auth'
import ReCAPTCHA from 'react-google-recaptcha'

export const useForgotPassword = () => {
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [passwordRecovery, { isLoading, isSuccess }] = usePasswordRecoveryMutation()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm<ForgotArgsData>({
    resolver: zodResolver(emailValidationScheme),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { email: '', captcha: '' },
  })

  const handleVerify = (token: string | null) => {
    setValue('captcha', token || '', { shouldValidate: true })
  }

  const onSubmit: SubmitHandler<ForgotArgsData> = async data => {
    try {
      await passwordRecovery({
        email: data.email,
        recaptcha: data.captcha,
        baseUrl: window.location.origin,
      }).unwrap()

      setSubmittedEmail(data.email)
      setIsModalOpen(true)
      reset({ email: '', captcha: '' })
    } catch (error) {
      const errorMessage = error as ErrorResponse
      setError('email', {
        type: 'manual',
        message: errorMessage?.data?.messages[0]?.message || errorMessage?.data?.error,
      })
    } finally {
      recaptchaRef.current?.reset()
    }
  }

  return {
    submittedEmail,
    isModalOpen,
    setIsModalOpen,
    register,
    handleSubmit,
    errors,
    isValid,
    isLoading,
    isSuccess,
    handleVerify,
    recaptchaRef,
    onSubmit,
  }
}
