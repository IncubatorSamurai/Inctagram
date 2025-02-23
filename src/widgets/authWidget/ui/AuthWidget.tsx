import { GoogleAuth } from '@/features/googleAuth'
import s from './AuthWidget.module.scss'
import { GitHubAuth } from '@/features/gitHubAuth'

export const AuthWidget = () => {
  return (
    <div className={s.row}>
      <GoogleAuth />
      <GitHubAuth />
    </div>
  )
}
