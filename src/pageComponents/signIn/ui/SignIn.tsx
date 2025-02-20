import { Typography } from '@/shared/ui/typography'
import s from './SignIn.module.scss'
import { AuthWidget } from '@/widgets/authWidget'

export const SignInPage = () => {
  return (
    <div className={s.container}>
      <Typography variant="h1">Sign In</Typography>
      <AuthWidget />
    </div>
  )
}
