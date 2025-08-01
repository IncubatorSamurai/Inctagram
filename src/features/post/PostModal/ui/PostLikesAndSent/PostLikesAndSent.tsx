import { BookMarkOutlineIcon } from '@/shared/assets/icons/BookMarkOutlineIcon'
import { PaperPlaneIcon } from '@/shared/assets/icons/PaperPlaneIcon'
import s from './PostLikesAndSent.module.scss'
import { parseIsoDate } from '@/shared/utils'
import { useGetPostLikesQuery } from '@/shared/api/post/likes/postLikeApi'
import { useSearchParams } from 'next/navigation'
import { Typography } from '@/shared/ui/typography'
import { PostLikesAvatars } from '../../../../post-like/PostLikesAvatars/PostLikesAvatars'
import { LikePost } from '../../../../post-like/LikePost/LikePost'

type LikesAndCountProps = {
  createdAt: string | undefined
  likes: number | undefined
  whoLikes: string[] | undefined
}

export const PostLikesAndSent = ({ createdAt }: LikesAndCountProps) => {
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')

  const numId = Number(postId)
  const { data } = useGetPostLikesQuery({id:numId}, { skip: !postId })
console.log(data,'datadata')
  const createDate = createdAt && parseIsoDate(createdAt)
  return (
    <div className={s.postsSideLikes}>
      <div className={s.likeAndSent}>
        <div className={s.likeS}>
          <LikePost id={numId} likesItems={data?.items} />
          <PaperPlaneIcon />
        </div>
        <BookMarkOutlineIcon />
      </div>
      <div className={s.info}>
        <PostLikesAvatars id={numId} />
      </div>
      <Typography className={s.date} variant="small_text">
        {createDate}
      </Typography>
    </div>
  )
}
