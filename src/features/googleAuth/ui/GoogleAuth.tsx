import Link from 'next/link'
import s from './GoogleAuth.module.scss'
import { GoogleIcon } from '@/shared/assets/icons/GoogleIcon'

export const GoogleAuth = () => {
  return (
    <Link href="#">
      <GoogleIcon className={s.google} />
    </Link>
  )
}
