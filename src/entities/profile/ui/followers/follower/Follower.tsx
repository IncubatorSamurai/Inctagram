import Image from 'next/image'
import s from './Follower.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { FollowButton } from '@/features/followUser'
import { BlankCover } from '@/shared/ui/profile/blankCover'

type Props = {
  avatarSrc: string | undefined
  profileUrl: string
  isFollowing: boolean
  isFollowedBy: boolean
  userName: string
  userId: number
}

export const Follower = ({ avatarSrc, profileUrl, isFollowing, userId, userName }: Props) => {
  return (
    <div className={s.root}>
      <div className={s.avaName}>
        {avatarSrc ? (
          <Image src={avatarSrc} className={s.avatar} width={36} height={36} alt={'avatar'} />
        ) : (
          <BlankCover className={s.blancAvatar} />
        )}

        <Typography>{profileUrl}</Typography>
      </div>
      <div className={s.btnGroup}>
        <FollowButton isFollowing={isFollowing} userId={userId} userName={userName} />
        <Button variant="icon">Delete</Button>
      </div>
    </div>
  )
}
