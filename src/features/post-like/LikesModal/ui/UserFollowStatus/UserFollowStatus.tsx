import { PostLikeItem } from '@/shared/api/post/likes/postLikeApi.types'
import s from './UserFollowStatus.module.scss'
import { Link } from '@/i18n/routing'
import { Typography } from '@/shared/ui/typography'
import { FollowButton } from '@/features/followUser'
import { forwardRef } from 'react'

type Props = { user: PostLikeItem }

export const UserFollowStatus = forwardRef<HTMLDivElement, Props>(({ user }, ref) => {
  const { avatars, userId, userName, isFollowing } = user

  return (
    <div ref={ref} className={s.row}>
      <Link href={`/profile/${userId}`} className={s.container}>
        <span className={s.box}>
          <span
            className={s.userPhoto}
            style={{ background: `center/cover no-repeat url(${avatars[0]?.url})` }}
          />
          <Typography variant="regular_text_16" className={s.user}>
            {userName}
          </Typography>
        </span>
      </Link>
      <FollowButton
        className={s.btn}
        isFollowing={isFollowing}
        userId={userId}
        userName={userName}
      />
    </div>
  )
})

// для читаемых стэктрейсов и hot-reload
UserFollowStatus.displayName = 'UserFollowStatus'
