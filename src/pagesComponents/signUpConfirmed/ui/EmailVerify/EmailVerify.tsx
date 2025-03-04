import { Typography } from '@/shared/ui/typography'
import s from './EmailVerify.module.scss'
import { useRouter } from 'next/navigation'
import { PATH } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'

export const EmailVerify = () => {
  const router = useRouter()
  return (
    <div className={s.container}>
      <Typography variant="h1" className={s.title}>
        Congratulations!
      </Typography>
      <Typography variant="regular_text_16" className={s.description}>
        Your email has been confirmed
      </Typography>
      <div className={s.buttonAndImageWrapper}>
        <Button className={s.button} onClick={() => router.push(PATH.SIGNIN)}>
          Sign In
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
