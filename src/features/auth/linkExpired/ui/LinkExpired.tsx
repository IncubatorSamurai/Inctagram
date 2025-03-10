import { Typography } from '@/shared/ui/typography'
import s from './LinkExpired.module.scss'
import Image from 'next/image'
import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'

export const LinkExpired = ({ children }: { children?: ReactNode }) => {
  const tAuth = useTranslations('auth')

  return (
    <div className={s.container}>
      <div className={s.box}>
        <Typography className={s.title} variant="h1">
          {tAuth('emailExpired')}
        </Typography>
        <Typography className={s.text} variant="regular_text_16">
          {tAuth('sendLinkAgain')}
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
