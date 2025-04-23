'use client'

import { Link } from '@/i18n/routing'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'
import { AuthWidget } from '@/widgets/authWidget'
import s from './SignUp.module.scss'
import { PATH } from '@/shared/config/routes'
import { SignUpForm } from '@/features/auth/signUp'
import { useTranslations } from 'next-intl'
import { useTrackPrevPath } from '@/shared/hooks/useTrackPrevPath'

export const SignUpPage = () => {
  const tAuth = useTranslations('auth')
  useTrackPrevPath()
  return (
    <div>
      <Card className={s.root}>
        <div className={s.wrapper}>
          <Typography variant="h1" className={s.text}>
            {tAuth('signUpHeader')}
          </Typography>
          <AuthWidget className={s.marginAuth} />
          <SignUpForm />
          <Typography variant="regular_text_14" className={s.padding}>
            {tAuth('haveAccount')}
          </Typography>
          <Button fullWidth variant="text" className={s.marginBtn} asChild>
            <Link href={PATH.SIGNIN}>{tAuth('signIn')}</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
