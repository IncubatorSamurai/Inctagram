import Image from 'next/image'
import s from './Follower.module.scss'
import { Typography } from '@/shared/ui/typography'
import { FollowButton } from '@/features/followUser'
import { BlankCover } from '@/shared/ui/profile/blankCover'
import { forwardRef } from 'react'
import Link from 'next/link'
import { PATH } from '@/shared/config/routes'
import { UpdateFollowingThunk } from '../modal/model/useInfiniteFollowersSearch'
type Props = {
  avatarSrc?: string
  isFollowing: boolean
  userName: string
  userId: number
  isMe: boolean
  updateQuery?: ({
    userId,
    isFollowing,
  }: {
    userId: number
    isFollowing: boolean
  }) => UpdateFollowingThunk
}

export const Follower = forwardRef<HTMLDivElement, Props>(
  ({ avatarSrc, isFollowing, userId, userName, isMe, updateQuery }, ref) => {
    return (
      <div className={s.root}>
        <div className={s.avaName} ref={ref}>
          {avatarSrc ? (
            <Image src={avatarSrc} className={s.avatar} width={36} height={36} alt={'avatar'} />
          ) : (
            <BlankCover size={'2.25rem'} classNameSvg={s.blankCoverSvg} />
          )}
          <Typography asChild variant="bold_text_14">
            <Link href={`${PATH.MYPROFILE}/${userId}`}>{userName}</Link>
          </Typography>
        </div>
        <div className={s.btnGroup}>
          {!isMe && (
            <FollowButton
              isFollowing={isFollowing}
              userId={userId}
              userName={userName}
              updateQuery={updateQuery}
            />
          )}
        </div>
      </div>
    )
  }
)
Follower.displayName = 'Follower'
