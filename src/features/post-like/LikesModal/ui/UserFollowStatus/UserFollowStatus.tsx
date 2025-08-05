import { PostLikeItem } from '@/shared/api/post/likes/postLikeApi.types'
import { Link } from '@/i18n/routing'
import { Typography } from '@/shared/ui/typography'
import { FollowButton } from '@/features/followUser'
import { forwardRef } from 'react'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store'
import { UpdateFollowingThunk } from '@/shared/types'
import { BlankCover } from '@/shared/ui/profile/blankCover'
import Image from 'next/image'
import s from './UserFollowStatus.module.scss'

type Props = {
  user: PostLikeItem
  updateQuery?: ({
    userId,
    isFollowing,
  }: {
    userId: number
    isFollowing: boolean
  }) => UpdateFollowingThunk
}

export const UserFollowStatus = forwardRef<HTMLDivElement, Props>(({ user, updateQuery }, ref) => {
  const { avatars, userId, userName, isFollowing } = user
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { data: meData } = useMeQuery(undefined, { skip: !isLoggedIn })

  return (
    <div ref={ref} className={s.row}>
      <Link href={`/profile/${userId}`} className={s.container}>
        {avatars[0]?.url ? (
          <Image src={avatars[0]?.url} className={s.avatar} width={36} height={36} alt={'avatar'} />
        ) : (
          <BlankCover className={s.blankCover} />
        )}
        <Typography variant="regular_text_16" className={s.user}>
          {userName}
        </Typography>
      </Link>
      {userId !== meData?.userId && (
        <FollowButton
          className={s.btn}
          isFollowing={isFollowing}
          userId={userId}
          userName={userName}
          updateQuery={updateQuery}
        />
      )}
    </div>
  )
})

// для читаемых стэктрейсов и hot-reload
UserFollowStatus.displayName = 'UserFollowStatus'
