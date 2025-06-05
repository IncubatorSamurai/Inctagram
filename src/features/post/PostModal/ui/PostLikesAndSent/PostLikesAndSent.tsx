import { BookMarkOutlineIcon } from '@/shared/assets/icons/BookMarkOutlineIcon'
import { PaperPlaneIcon } from '@/shared/assets/icons/PaperPlaneIcon'
import s from './PostLikesAndSent.module.scss'
import { parseIsoDate } from '@/shared/utils'
import { useGetPostLikesQuery } from '@/shared/api/post/likes/postLikeApi'
import { useSearchParams } from 'next/navigation'
import { Typography } from '@/shared/ui/typography'
import { PostLikesAvatars } from './PostLikesAvatars/PostLikesAvatars'
import { LikePost } from './LikePost/LikePost'

type LikesAndCountProps = {
  createdAt?: string | undefined
}

export const PostLikesAndSent = ({ createdAt }: LikesAndCountProps) => {
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const { data } = useGetPostLikesQuery(postId ?? '', { skip: !postId })

  const createDate = createdAt && parseIsoDate(createdAt)
  return (
    <div className={s.postsSideLikes}>
      <div className={s.likeAndSent}>
        <div className={s.likeS}>
          <LikePost id={postId ?? ''} likesItems={data?.items} />
          <PaperPlaneIcon />
        </div>
        <div>
          <BookMarkOutlineIcon />
        </div>
      </div>
      <div className={s.info}>
        <PostLikesAvatars id={postId ?? ''} />
      </div>
      <Typography className={s.date} variant="small_text">
        {createDate}
      </Typography>
    </div>
  )
}
