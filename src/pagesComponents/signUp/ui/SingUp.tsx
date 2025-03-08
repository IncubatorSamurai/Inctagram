'use client'

import { Link } from '@/i18n/routing'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'
import { AuthWidget } from '@/widgets/authWidget'
import s from './SignUp.module.scss'
import { PATH } from '@/shared/config/routes'
import { SignUpForm } from '@/features/auth/signUp'

export const SignUpPage = () => {
  return (
    <div>
      <Card className={s.root}>
        <div className={s.wrapper}>
          <Typography variant="h1" className={s.text}>
            Sign Up
          </Typography>
          <AuthWidget className={s.marginAuth} />
          <SignUpForm />
          <Typography variant="regular_text_14" className={s.padding}>
            Do you have an account?
          </Typography>
          <Button fullWidth variant="text" className={s.marginBtn}>
            <Link className={s.linkStyles} href={PATH.SIGNIN}>
              Sign In
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
