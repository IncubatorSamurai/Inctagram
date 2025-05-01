import { Typography } from '@/shared/ui/typography'
import s from './TriggerButton.module.scss'
import { BellOutlineIcon } from '@/shared/assets/icons/BellOutlineIcon'
import clsx from 'clsx'

type Props = {
  count: number
}
export const TriggerButton = ({ count }: Props) => {
  return (
    <Typography
      variant="small_text"
      className={clsx(s.button, count && s.count)}
      data-count={count}
    >
      <BellOutlineIcon color="var(--color-light-100)" />
    </Typography>
  )
}
