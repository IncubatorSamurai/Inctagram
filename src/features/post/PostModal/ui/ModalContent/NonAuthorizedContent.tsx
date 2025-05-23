import s from './../PostsModal.module.scss'
import { CommentsResponse, Post } from '@/shared/api/post/postApi.types'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { Typography } from '@/shared/ui/typography'
import { Scrollbar } from '@/shared/ui/scrollbar'
import { CommentItem } from '@/features/publicPosts/ui/PublicModal/CommentItem'
import { renderLikeAvatars } from '@/features/publicPosts/ui/PublicModal/PublicModalRenderAvatars'
import { format } from 'date-fns'
import Image from 'next/image'
type NonAuthorizedContentProps = {
  post: Post
  commentsData: CommentsResponse | null
}
export const NonAuthorizedContent = ({ post, commentsData }: NonAuthorizedContentProps) => {
  const comments = commentsData?.items || []
  const { avatarOwner, userName, likesCount, createdAt, avatarWhoLikes } = post
  return (
    <div className={s.public_modal_content}>
      <div className={s.public_content_title}>
        {avatarOwner ? (
          <Image src={avatarOwner} alt="avatarOwner" width={36} height={36} />
        ) : (
          <NoAvatar />
        )}
        <Typography variant={'h3'}>{userName}</Typography>
      </div>
      {/*КОММЕНТАРИИ*/}
      <ul className={s.public_content_list}>
        <Scrollbar className={s.modal_scroll}>
          {comments?.length > 0 ? (
            comments.map(comment => <CommentItem key={comment.id} comment={comment} />)
          ) : (
            <li>No comments</li>
          )}
        </Scrollbar>
      </ul>
      {/*--------*/}
      <div className={s.public_content_footer}>
        <div className={s.public_footer_likes}>
          <ul className={s.public_footer_avatars}>
            {renderLikeAvatars(likesCount, avatarWhoLikes)}
          </ul>
          <div className={s.likes}>
            {likesCount}
            <Typography variant={'bold_text_14'}>&quot;Like&quot;</Typography>
          </div>
        </div>
        <Typography variant={'small_text'} className={s.item_comment_date}>
          {format(new Date(createdAt), 'MMMM d, yyyy')}
        </Typography>
      </div>
    </div>
  )
}
