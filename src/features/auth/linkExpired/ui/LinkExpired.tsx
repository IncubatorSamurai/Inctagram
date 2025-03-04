import { Typography } from '@/shared/ui/typography'
import s from './LinkExpired.module.scss'
import Image from 'next/image'
import { ReactNode } from 'react'

export const LinkExpired = ({ children }: { children?: ReactNode }) => {
  return (
    <div className={s.container}>
      <div className={s.box}>
        <Typography className={s.title} variant="h1">
          Email verification link expired
        </Typography>
        <Typography className={s.text} variant="regular_text_16">
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>
      </div>
      <div className={s.content}>
        {children}
        <Image
          className={s.image}
          src={'/link-expired.png'}
          height={352}
          width={473}
          alt="link expired"
        />
      </div>
    </div>
  )
}
