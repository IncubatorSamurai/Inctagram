import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/card/Card'
import s from './SignIn.module.scss'
import { SignInForm } from '@/features/auth/signIn'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { AuthWidget } from '@/widgets/authWidget'

export const SignInPage = () => {
  return (
    <div className={s.container}>
      <Card className={s.wrapper}>
        <Typography className={s.text} variant="h1">
          Sign In
        </Typography>
        <div className={s.box}>
          {' '}
          <AuthWidget />
        </div>
        <SignInForm />
        <Typography className={s.text}>Don’t have an account?</Typography>
        <Button asChild={true} variant="text" className={s.button}>
          <Link href={'signup'}>Sign Up</Link>
        </Button>
      </Card>
    </div>
  )
}
