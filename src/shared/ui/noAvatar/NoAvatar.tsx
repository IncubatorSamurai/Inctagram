import { PersonIcon } from '@/shared/assets/icons/PersonIcon'
import s from './NoAvatar.module.scss'
import { clsx } from 'clsx'

type Props = {
  className?: string
}

export const NoAvatar = ({ className }: Props) => {
  return (
    <div className={clsx(s.no_avatar, className)}>
      <PersonIcon />
    </div>
  )
}
