import { Input } from '@/shared/ui/input'
import s from './LinkExpiredForm.module.scss'
import { Button } from '@/shared/ui/button'

export const LinkExpiredForm = () => {
  return (
    <form className={s.form} action="">
      <Input label="Email" />
      <Button className={s.button}>Resend verification link</Button>
    </form>
  )
}
