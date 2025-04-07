import s from './CounterRegisteredUsers.module.scss'
import { Typography } from '@/shared/ui/typography'

type CountRegisteredUsers = {
  totalUsers: number;
}

export const CountRegisteredUsers = ({totalUsers} : CountRegisteredUsers) => {
  const digitsArray = totalUsers.toString().padStart(6,"0").split("")

  return (
    <div className={s.public_users_counter}>
      <Typography variant={'h2'}>Registered users:</Typography>
      <div className={s.public_counter}>
        {digitsArray.map((digit, index) => (
          <span key={index} className={s.counter_item}>
            <Typography variant ={"h2"}>{digit}</Typography>
          </span>
        ))}
      </div>
    </div>
  )
}