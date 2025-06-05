import { Scrollbar } from '@/shared/ui/scrollbar'
import { AddContent } from '../AddComment/AddComment'
import { PostLikesAndSent } from '../PostLikesAndSent/PostLikesAndSent'
import { Typography } from '@/shared/ui/typography'
import s from './PostContent.module.scss'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { useGetCommentsByPostIdQuery } from '@/shared/api/post/postApi'
import { CommentItem } from '@/features/publicPosts/ui/PublicModal/CommentItem'
import { formatDistanceToNow } from 'date-fns'

type PostContentProps = {
  likes: number | undefined
  whoLikes: string[] | undefined
  updatedAt: string | undefined
  createdAt: string | undefined
  ownreName: string | undefined
  description: string | undefined
  postId: number
  isLoggedIn: boolean
}

export const PostContent = ({
  ownreName,
  isLoggedIn,
  description,
  likes,
  whoLikes,
  updatedAt,
  createdAt,
  postId,
}: PostContentProps) => {
  const date = updatedAt && formatDistanceToNow(new Date(updatedAt))
  const { data } = useGetCommentsByPostIdQuery({ postId })
  const comments = data?.items || []
  return (
    <div className={s.postsSide}>
      <Scrollbar className={s.postsSideContent}>
        <div className={s.postDescription}>
          <div className={s.topContent}>
            <NoAvatar />
            <Typography variant="bold_text_14">{ownreName}</Typography>
            <Typography variant="regular_text_14">{description}</Typography>
          </div>
          <div className={s.sideInfo}>
            <Typography variant={'small_text'} className={s.date_description}>
              {date}
            </Typography>
          </div>
        </div>

        <ul className={s.comments_list}>
          {comments.length > 0 ? (
            comments.map(comment => (
              <CommentItem isLoggedIn={isLoggedIn} key={comment.id} comment={comment} />
            ))
          ) : (
            <li>No comments</li>
          )}
        </ul>
      </Scrollbar>
      <PostLikesAndSent likes={likes} whosLikes={whoLikes} createdAt={createdAt} />
      <AddContent placeholder={'Comment'} onPublish={() => {}} />
    </div>
  )
}
