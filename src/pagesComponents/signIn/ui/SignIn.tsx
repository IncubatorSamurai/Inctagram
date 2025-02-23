import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/card/Card'
import s from './SignIn.module.scss'
import { SignInForm } from '@/features/auth/signIn'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { AuthWidget } from '@/widgets/authWidget'

export const SignInPage = () => {
  return (
    <Card className={s.wrapper}>
      <Typography className={s.text} variant="h1">
        Sign In
      </Typography>
      <AuthWidget className={s.box} />
      <SignInForm />
      <Typography className={s.text} variant="regular_text_16">
        Don’t have an account?
      </Typography>
      <Button asChild={true} variant="text" className={s.button}>
        <Link href={'/signup'}>Sign Up</Link>
      </Button>
    </Card>
  )
}
