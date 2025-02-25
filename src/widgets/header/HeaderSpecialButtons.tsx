import { Button } from '@/shared/ui/button'
import s from './Header.module.scss'
import Link from 'next/link'
export const HeaderSpecialButtons = () => {
  return (
    <div className={s.nav_special}>
      <Button variant={'text'} asChild={true}>
        <Link href={'/login'}>Log In</Link>
      </Button>
      <Button variant={'primary'} asChild={true}>
        <Link href={'/signup'}>Sign Up</Link>
      </Button>
    </div>
  )
}
