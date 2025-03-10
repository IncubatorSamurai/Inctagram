import s from './Header.module.scss'
import { Button } from '@/shared/ui/button'
import { Link } from '@/i18n/routing'
import { PATH } from '@/shared/config/routes'
import { useTranslations } from 'next-intl'

export const HeaderSpecialButtons = () => {
  const tAuth = useTranslations('auth')

  return (
    <div className={s.nav_special}>
      <Button variant={'text'} asChild={true}>
        <Link href={PATH.SIGNIN}>{tAuth('signIn')}</Link>
      </Button>
      <Button variant={'primary'} asChild={true}>
        <Link href={PATH.SIGNUP}>{tAuth('signUp')}</Link>
      </Button>
    </div>
  )
}
