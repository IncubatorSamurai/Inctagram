import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/card/Card'
import s from './SignIn.module.scss'
import { Input } from '@/shared/ui/input'

export const SignInPage = () => {
  return (
    <div className={s.container}>
      <Card className={s.wrapper}>
        <Typography className={s.title} variant="h1">
          Sign In
        </Typography>
        <div className={s.box}> icons</div>
        <form>
          <Input label="email" />
        </form>
      </Card>
    </div>
  )
}
