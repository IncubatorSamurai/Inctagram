import { PersonIcon } from '@/shared/assets/icons/PersonIcon'
import s from './NoAvatar.module.scss'
export const NoAvatar = () => {
  return (
    <div className={s.no_avatar}>
      <PersonIcon />
    </div>
  )
}
