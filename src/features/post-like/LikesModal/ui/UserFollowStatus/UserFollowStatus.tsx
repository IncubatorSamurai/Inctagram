import { PostLikeItem } from '@/shared/api/post/likes/postLikeApi.types'
import s from './UserFollowStatus.module.scss'
import { Link } from '@/i18n/routing'
import { Typography } from '@/shared/ui/typography'
import { FollowButton } from '@/features/followUser'

type Props = { user: PostLikeItem }

export const UserFollowStatus = ({ user }: Props) => {
  const { avatars, userId, userName, isFollowing } = user

  return (
    <div className={s.row}>
      <Link href={`/profile/${userId}`} className={s.container}>
        <span className={s.box}>
          <span
            className={s.userPhoto}
            style={{ background: `center/cover no-repeat url(${avatars[0]?.url}) ` }}
          ></span>
          <Typography variant="regular_text_16" className={s.user}>
            {userName}
          </Typography>
        </span>
      </Link>
      <FollowButton className={s.btn} isFollowing={isFollowing} userId={userId} userName={userName} />
    </div>
  )
}
