import { GoogleAuth } from '@/features/auth/googleAuth'
import s from './AuthWidget.module.scss'

export const AuthWidget = () => {
  return (
    <div className={s.row}>
      <GoogleAuth />
    </div>
  )
}
