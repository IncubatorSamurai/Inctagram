import { useState } from 'react'
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

export const ForgotPasswordForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted },
  } = useForm<ForgotArgsData>({
    resolver: zodResolver(emailValidationScheme),
    mode: 'onTouched',
    defaultValues: { email: '' },
  })

  const onSubmit: SubmitHandler<ForgotArgsData> = async data => {
    setSubmittedEmail(data.email)
    setIsModalOpen(true)
    reset()
  }

  return (
    <Card className={s.forgotPassword}>
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
          Enter your email address and we will send you further instructions
        </Typography>
        {isSubmitted && (
          <Typography variant="regular_text_14" className={s.forgot_password_submit}>
            The link has been sent by email. If you don’t receive an email send link again
          </Typography>
        )}
      </form>
      <div className={s.forgot_password_controls}>
        <div className={s.forgot_password_submit}>
          <Button
            variant="primary"
            type="submit"
            disabled={!isValid}
            form={'forgot_password_form'}
            fullWidth={true}
          >
            Send Link
          </Button>
          <Button variant="text" asChild fullWidth={true}>
            <Link href="/signin">Back to Sign In</Link>
          </Button>
        </div>

        {isSubmitted ? (
          ''
        ) : (
          <div className={s.forgot_password_recaptcha}>
            <Recaptcha />
          </div>
        )}
      </div>

      <ForgotPasswordModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={submittedEmail}
      />
    </Card>
  )
}
