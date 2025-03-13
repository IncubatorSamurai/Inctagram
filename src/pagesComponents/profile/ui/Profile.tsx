'use client'
import s from './Profile.module.scss'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useParams } from 'next/navigation'
import { useGetPublicProfileQuery } from '@/shared/api/publicUser/publicUserApi'

export const ProfilePage = () => {
  const params = useParams()
  const { userId } = params
  const { data: meData } = useMeQuery()
  const isMyProfile = meData?.userId === Number(userId)
  const { data: publicInfoProfile } = useGetPublicProfileQuery({ profileId: userId as string })

  const followArray = [
    publicInfoProfile?.userMetadata.following ? publicInfoProfile?.userMetadata.following : 0,
    publicInfoProfile?.userMetadata.followers ? publicInfoProfile?.userMetadata.followers : 0,
    publicInfoProfile?.userMetadata.publications ? publicInfoProfile?.userMetadata.publications : 0,
  ]

  return (
    <div className={s.profilePage}>
      <section className={s.profile}>
        <Image src={'next.svg'} className={s.avatar} width={200} height={200} alt={'avatar'} />
        <div className={s.profileInfo}>
          <div className={s.name}>
            <Typography variant={'h1'}>{publicInfoProfile?.userName}</Typography>
            {isMyProfile ? (
              <Button variant={'secondary'}>Profile Settings</Button>
            ) : (
              <div className={s.followButtons}>
                <Button variant={'primary'}>Follow</Button>
                <Button variant={'secondary'}>Send Message</Button>
              </div>
            )}
          </div>
          <div className={s.statistics}>
            {followArray.map((item, i) => (
              <li key={i} className={s.followInfoItem}>
                <Typography variant={'bold_text_14'}>{item}</Typography>
                <Typography variant={'regular_text_14'}>
                  {i === 0 && 'Following'}
                  {i === 1 && 'Followers'}
                  {i === 2 && 'Publications'}
                </Typography>
              </li>
            ))}
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
