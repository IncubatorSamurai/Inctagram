import s from './Profile.module.scss'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'

export const ProfilePage = () => {
  return (
    <div className={s.profilePage}>
      <section className={s.profile}>
        <Image src={'next.svg'} className={s.avatar} width={200} height={200} alt={'avatar'} />
        <div className={s.profileInfo}>
          <div className={s.name}>
            <Typography variant={'h1'}>URLProfile</Typography>
            <Button variant={'secondary'}>Profile Settings</Button>
          </div>
          <div className={s.statistics}>
            <Typography className={s.statisticItem}>
              2 218 <span>Following</span>
            </Typography>
            <Typography className={s.statisticItem}>
              2 358 <span>Followers</span>
            </Typography>
            <Typography className={s.statisticItem}>
              2 764 <span>Publications</span>
            </Typography>
          </div>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid aut expedita fugit
            in ipsum libero magnam voluptates. Ab asperiores distinctio dolore doloremque, et
            expedita harum, in nemo nisi omnis provident, quam tenetur! Blanditiis cum deserunt
            officia sed voluptates. Consequatur eligendi expedita fuga reiciendis sunt? Doloremque
            eveniet explicabo repellendus sunt.
          </Typography>
        </div>
      </section>
      <section className={s.posts}>
        <Image src={'next.svg'} className={s.post} width={234} height={228} alt={'post'} />
        <Image src={'next.svg'} className={s.post} width={234} height={228} alt={'post'} />
        <Image src={'next.svg'} className={s.post} width={234} height={228} alt={'post'} />
        <Image src={'next.svg'} className={s.post} width={234} height={228} alt={'post'} />
        <Image src={'next.svg'} className={s.post} width={234} height={228} alt={'post'} />
        <Image src={'next.svg'} className={s.post} width={234} height={228} alt={'post'} />
        <Image src={'next.svg'} className={s.post} width={234} height={228} alt={'post'} />
        <Image src={'next.svg'} className={s.post} width={234} height={228} alt={'post'} />
      </section>
    </div>
  )
}
