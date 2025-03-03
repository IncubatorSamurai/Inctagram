import { useState, useEffect } from 'react'
import { Typography } from '@/shared/ui/typography'
import s from './ForgotPasswordForm.module.scss'
import { Card } from '@/shared/ui/card/Card'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import { Recaptcha } from '@/shared/ui/recaptcha/Recaptcha'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordModal } from '@/features/auth/forgotPasswodForm/ui/forgotPaswordModal/ForgotPasswordModal'
import { emailValidationScheme, ForgotArgsData } from '@/shared/schemas/emailValidationScheme'
import { usePasswordRecoveryMutation } from '@/shared/api/auth/authApi'
import { PATH } from '@/shared/config/routes'

import { handleError } from '@/shared/utils/handelError'

export const ForgotPasswordForm = () => {
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [passwordRecovery, { isLoading, isError, error, isSuccess }] = usePasswordRecoveryMutation()

  const errorMessage = isError ? handleError({ error }) : ''

  const handleVerify = (token: string | null) => {
    setRecaptchaToken(token || '')
  }
  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(true)
    }
  }, [isSuccess, submittedEmail])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ForgotArgsData>({
    resolver: zodResolver(emailValidationScheme),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { email: '' },
  })

  const onSubmit: SubmitHandler<ForgotArgsData> = async data => {
    try {
      const response = await passwordRecovery({
        email: data.email,
        recaptcha: recaptchaToken || '',
        baseUrl: window.location.origin,
      })

      if (response) {
        setSubmittedEmail(data.email)
        reset()
      } else {
        console.error('Ошибка: статус ответа не успешен')
      }
    } catch (err) {
      console.error('Ошибка при выполнении запроса:', err)
    }
  }

  return (
    <Card className={s.forgotpassword}>
      <Typography variant="h1" className={s.forgot_password_title}>
        Forgot Password
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={s.forgot_password_form}
        id="forgot_password_form"
      >
        <Input
          label="Email"
          error={errors.email?.message}
          type="email"
          placeholder="Epam@epam.com"
          {...register('email')}
        />

        <Typography variant="regular_text_14" className={s.forgot_password_text}>
          Enter your email address and we will send you further instructions.
        </Typography>

        {isSuccess && (
          <Typography variant="regular_text_14" className={s.forgot_password_submit}>
            The link has been sent by email. If you don’t receive an email send link again
          </Typography>
        )}

        {isError && <Typography variant="error">{errorMessage}</Typography>}
      </form>

      <div className={s.forgot_password_controls}>
        <div className={s.forgot_password_submit}>
          <Button
            variant="primary"
            type="submit"
            disabled={!isValid || !recaptchaToken}
            form="forgot_password_form"
            fullWidth
          >
            {isLoading ? 'Sending...' : 'Send Link'}
          </Button>

          <Button variant="text" asChild fullWidth>
            <Link href={PATH.SIGNIN}>Back to Sign In</Link>
          </Button>
        </div>

        <div className={s.forgot_password_recaptcha}>
          <Recaptcha onChange={handleVerify} />
        </div>
      </div>
      <ForgotPasswordModal email={submittedEmail} open={isModalOpen} onChange={setIsModalOpen} />
    </Card>
  )
}
