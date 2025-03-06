import { useState, useRef, useCallback} from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePasswordRecoveryMutation } from '@/shared/api/auth/authApi'
import { emailValidationScheme, ForgotArgsData } from '@/shared/schemas/emailValidationScheme'
import { ErrorResponse } from '@/shared/types/auth'
import ReCAPTCHA from 'react-google-recaptcha'

export const useForgotPassword = () => {
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [passwordRecovery, { isLoading, isSuccess }] = usePasswordRecoveryMutation()

  const handleVerify = useCallback((token: string | null) => {
    setRecaptchaToken(token || '')
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<ForgotArgsData>({
    resolver: zodResolver(emailValidationScheme),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { email: '' },
  })

  const onSubmit: SubmitHandler<ForgotArgsData> = async data => {

    try {
      await passwordRecovery({
        email: data.email,
        recaptcha: recaptchaToken,
        baseUrl: window.location.origin,
      }).unwrap()

      setSubmittedEmail(data.email)
      setIsModalOpen(true)
      reset()

    } catch (error) {
      const errorMessage = error as ErrorResponse
      setError('email', {
        type: 'manual',
        message: errorMessage?.data?.messages[0]?.message || errorMessage?.data?.error,
      })

    } finally {
      recaptchaRef.current?.reset()
      setRecaptchaToken('')
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
    recaptchaToken,
  }
}
