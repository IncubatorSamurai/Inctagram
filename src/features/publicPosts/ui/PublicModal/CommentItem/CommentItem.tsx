'use client'
import { Comment } from '@/shared/api/post/postApi.types' // Путь может отличаться
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { formatDistanceToNow } from 'date-fns'
import s from './CommentItem.module.scss'
import { Button } from '@/shared/ui/button'
import { HeartIcon } from '@/shared/assets/icons/HeartIcon'
import { HeartOutlineIcon } from '@/shared/assets/icons/HeartOutlineIcon'
import { AddContent } from '@/features/post/PostModal/ui/AddComment/AddComment'
import { AnswerItem } from '@/features/post/PostModal/ui/AnswerItem/AnswerItem'
import { useCommentItem } from '@/shared/hooks/useCommentItem'

const WIDTH_AVATAR = 36
const HEIGHT_AVATAR = 36

type CommentItemProps = {
  comment: Comment
  isLoggedIn: boolean
}

export const CommentItem = ({ isLoggedIn, comment }: CommentItemProps) => {
  const {
    onAnswerLike,
    onCommentLike,
    onPublishAnswer,
    onVisibleAnswer,
    isAnswersVisible,
    isActiveTextField,
    answerContent,
    answersData,
    onAnswer,
    onAnswerContent,
  } = useCommentItem(comment.postId, comment.id, comment.isLiked)

  return (
    <li key={comment.id} className={s.public_content_item}>
      <div className={s.comment_item_img}>
        {comment.from.avatars.length > 0 ? (
          <Image
            src={comment.from.avatars[1].url || ''}
            alt="from-avatar"
            width={WIDTH_AVATAR}
            height={HEIGHT_AVATAR}
          />
        ) : (
          <NoAvatar />
        )}
      </div>
      <div className={s.comment_content}>
        <div className={s.item_comment}>
          <Typography variant={'bold_text_14'} asChild>
            <span>{comment.from.username}</span>
          </Typography>
          {comment.content}
        </div>
        <div className={s.comment_bottom}>
          <Typography variant={'small_text'} className={s.item_comment_date}>
            {formatDistanceToNow(new Date(comment.createdAt))}
          </Typography>
          {isLoggedIn && comment.likeCount > 0 && (
            <Typography asChild variant={'semi-bold_small_text'}>
              <span className={s.comment_is_like_count}>Like: {comment.likeCount}</span>
            </Typography>
          )}

          {isLoggedIn && (
            <Button asChild variant={'text'} className={s.comment_answer_btn} onClick={onAnswer}>
              <Typography variant={'semi-bold_small_text'}>
                {isActiveTextField ? 'Close' : 'Answer'}
              </Typography>
            </Button>
          )}
        </div>
        {isActiveTextField && (
          <AddContent
            value={answerContent}
            onChange={onAnswerContent}
            placeholder={'Answer'}
            className={s.comment_answer_textarea}
            onPublish={onPublishAnswer}
          />
        )}
        {comment.answerCount > 0 && (
          <Button onClick={onVisibleAnswer} variant="text">
            <span className={s.toggle_answer}>
              {isAnswersVisible ? 'Hide Answers' : 'View Answers'} ({comment.answerCount})
            </span>
          </Button>
        )}

        {isAnswersVisible && answersData && (
          <ul>
            {answersData.items.map(answer => (
              <AnswerItem key={answer.id} answer={answer} onLike={onAnswerLike} />
            ))}
          </ul>
        )}
      </div>

      <div className={s.like_comment}>
        {isLoggedIn && (
          <Button variant={'icon'} onClick={onCommentLike}>
            {comment.isLiked ? (
              <HeartIcon width={16} height={16} className={s.like_on} />
            ) : (
              <HeartOutlineIcon width={16} height={16} />
            )}
          </Button>
        )}
      </div>
    </li>
  )
}
