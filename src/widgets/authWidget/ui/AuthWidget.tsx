import { GoogleAuth } from '@/features/googleAuth'
import s from './AuthWidget.module.scss'
import { GitHubAuth } from '@/features/gitHubAuth'
import clsx from 'clsx'

type Props = {
  className?: string
}
export const AuthWidget = ({ className }: Props) => {
  return (
    <div className={clsx(s.row, className)}>
      <GoogleAuth />
      <GitHubAuth />
    </div>
  )
}
