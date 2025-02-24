import { Typography } from '@/shared/ui/typography'
import s from './LinkExpiredPage.module.scss'
import { LinkExpiredForm } from '@/features/auth/linkExpiredForm'
import Image from 'next/image'

export const LinkExpiredPage = () => {
  return (
    <div className={s.container}>
      <div className={s.box}>
        <Typography variant="h1">Email verification link expired</Typography>
        <Typography className={s.text} variant="regular_text_16">
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>
      </div>
      <LinkExpiredForm />
      <Image
        className={s.image}
        src={'/link-expired.svg'}
        height={100}
        width={100}
        alt="link expired"
      />
    </div>
  )
}
