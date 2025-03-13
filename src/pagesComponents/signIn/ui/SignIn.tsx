import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/card'
import s from './SignIn.module.scss'
import { SignInForm } from '@/features/auth'
import { Button } from '@/shared/ui/button'
import { AuthWidget } from '@/widgets/authWidget'
import { Link } from '@/i18n/routing'
import { PATH } from '@/shared/config/routes'
import { useTranslations } from 'next-intl'

export const SignInPage = () => {
  const tAuth = useTranslations('auth')

  return (
    <Card className={s.wrapper}>
      <Typography className={s.text} variant="h1">
        {tAuth('signInHeader')}
      </Typography>
      <AuthWidget className={s.box} />
      <SignInForm />
      <Typography className={s.text} variant="regular_text_16">
        {tAuth('haveAccount')}
      </Typography>
      <Button asChild={true} variant="text" className={s.button}>
        <Link href={PATH.SIGNUP}>{tAuth('signUp')}</Link>
      </Button>
    </Card>
  )
}
