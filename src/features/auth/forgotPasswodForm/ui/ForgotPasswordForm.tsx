import { Typography } from '@/shared/ui/typography'
import s from './ForgotPasswordForm.module.scss'
import { Card } from '@/shared/ui/card/Card'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button/Button'
import { Recaptcha } from '@/shared/ui/recaptcha/Recaptcha'
import { PATH } from '@/shared/config/routes'
import { Link } from '@/i18n/routing'
import { useForgotPassword } from '@/features/auth/forgotPasswodForm/hooks/useForgotPassword'
import { EmailSentModal } from '@/features/auth'
import { useTranslations } from 'next-intl'

export const ForgotPasswordForm = () => {
  const {
    disabled,
    submittedEmail,
    isModalOpen,
    setIsModalOpen,
    register,
    handleSubmit,
    errors,
    isLoading,
    isSuccess,
    handleVerify,
    recaptchaRef,
    onSubmit,
  } = useForgotPassword()
  const tAuth = useTranslations('auth')
  const tCommon = useTranslations('common')

  return (
    <Card className={s.forgotpassword}>
      <Typography variant="h1" className={s.forgot_password_title}>
        {tAuth('forgotPassword')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={s.forgot_password_form}>
        <Input
          label={tAuth('email')}
          error={errors.email?.message}
          type="email"
          placeholder="Epam@epam.com"
          {...register('email')}
        />

        <Typography variant="regular_text_14" className={s.forgot_password_text}>
          {tAuth('forgotPasswordText')}
        </Typography>

        {isSuccess && (
          <Typography variant="regular_text_14" className={s.forgot_password_submit}>
            {tAuth('forgotPasswordSubmit')}
          </Typography>
        )}

        <div className={s.forgot_password_controls}>
          <div className={s.forgot_password_submit}>
            <Button variant="primary" type="submit" disabled={disabled} fullWidth>
              {isLoading ? tCommon('sending') : tAuth('sendLink')}
            </Button>

            <Button variant="text" asChild fullWidth>
              <Link href={PATH.SIGNIN}>{tAuth('backToSignUp')}</Link>
            </Button>
          </div>

          <div className={s.forgot_password_recaptcha}>
            <Recaptcha ref={recaptchaRef} onChange={handleVerify} />
          </div>
        </div>
      </form>
      <EmailSentModal email={submittedEmail} open={isModalOpen} onChange={setIsModalOpen} />
    </Card>
  )
}
