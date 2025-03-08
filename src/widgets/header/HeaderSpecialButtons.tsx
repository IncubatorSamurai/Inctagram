import s from './Header.module.scss'
import { Button } from '@/shared/ui/button'
import { Link } from '@/i18n/routing'
import { PATH } from '@/shared/config/routes'

export const HeaderSpecialButtons = () => {
  return (
    <div className={s.nav_special}>
      <Button variant={'text'} asChild={true}>
        <Link href={PATH.SIGNIN}>Log In</Link>
      </Button>
      <Button variant={'primary'} asChild={true}>
        <Link href={PATH.SIGNUP}>Sign Up</Link>
      </Button>
    </div>
  )
}
