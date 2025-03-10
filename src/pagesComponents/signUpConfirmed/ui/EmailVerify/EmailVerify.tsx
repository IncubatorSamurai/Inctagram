import { Typography } from '@/shared/ui/typography'
import s from './EmailVerify.module.scss'
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const EmailVerify = () => {
  const router = useRouter()
  const tAuth = useTranslations('auth')
  return (
    <div className={s.container}>
      <Typography variant="h1" className={s.title}>
        {tAuth('congratulations')}!
      </Typography>
      <Typography variant="regular_text_16" className={s.description}>
        {tAuth('emailConfirmed')}
      </Typography>
      <div className={s.buttonAndImageWrapper}>
        <Button className={s.button} onClick={() => router.push(PATH.SIGNIN)}>
          {tAuth('signIn')}
        </Button>
        <Image
          src={'/signUpConfirmed_2x.png'}
          alt=""
          width={432}
          height={300}
          className={s.image}
        />
      </div>
    </div>
  )
}
