import { Typography } from '@/shared/ui/typography'
import s from './ForgotPasswordForm.module.scss'
import { Card } from '@/shared/ui/card/Card'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button/Button'
import { Recaptcha } from '@/shared/ui/recaptcha/Recaptcha'
import { ForgotPasswordModal } from '@/features/auth/forgotPasswodForm/ui/forgotPaswordModal/ForgotPasswordModal'
import { PATH } from '@/shared/config/routes'
import { Link } from '@/i18n/routing'
import { useForgotPassword } from '@/shared/hooks/useForgotPassword'

export const ForgotPasswordForm = () => {
  const {
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
    recaptchaToken,
    onSubmit,
  } = useForgotPassword()

  return (
    <Card className={s.forgotpassword}>
      <Typography variant="h1" className={s.forgot_password_title}>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={s.forgot_password_form}>
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

        <div className={s.forgot_password_controls}>
          <div className={s.forgot_password_submit}>
            <Button
              variant="primary"
              type="submit"
              disabled={!isValid || !recaptchaToken}
              fullWidth
            >
              {isLoading ? 'Sending...' : 'Send Link'}
            </Button>

            <Button variant="text" asChild fullWidth>
              <Link href={PATH.SIGNIN}>Back to Sign In</Link>
            </Button>
          </div>

          <div className={s.forgot_password_recaptcha}>
            <Recaptcha ref={recaptchaRef} onChange={handleVerify} />
          </div>
        </div>
      </form>
      <ForgotPasswordModal email={submittedEmail} open={isModalOpen} onChange={setIsModalOpen} />
    </Card>
  )
}
