import { Typography } from '@/shared/ui/typography'
import s from './LinkExpiredPage.module.scss'

export const LinkExpiredPage = () => {
  return (
    <div className={s.container}>
      <Typography variant="h1">Email verification link expired</Typography>
      <Typography variant="regular_text_16">
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
    </div>
  )
}
