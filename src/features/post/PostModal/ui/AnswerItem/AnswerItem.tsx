import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import s from './AnswerItem.module.scss'
import { formatDistanceToNow } from 'date-fns'
import { HeartIcon } from '@/shared/assets/icons/HeartIcon'
import { HeartOutlineIcon } from '@/shared/assets/icons/HeartOutlineIcon'
import { Answer } from '@/shared/api/comments/commentsApi.types'
import Image from 'next/image'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'

const WIDTH_AVATAR = 36
const HEIGHT_AVATAR = 36
type AnswerItem = {
  answer: Answer
  onLike: (id: number, isLiked: boolean) => void
}
export const AnswerItem = ({ answer, onLike }: AnswerItem) => {
  return (
    <li key={answer.id} className={s.answer_item}>
      <div className={s.answer_avatar}>
        {answer.from.avatars.length > 0 ? (
          <Image
            src={answer.from.avatars[1].url || ''}
            alt="from-avatar"
            width={WIDTH_AVATAR}
            height={HEIGHT_AVATAR}
          />
        ) : (
          <NoAvatar />
        )}
      </div>
      <div className={s.answer_container}>
        <div className={s.answer_item_comment}>
          <Typography variant={'bold_text_14'} asChild>
            <span>{answer.from.username}</span>
          </Typography>
          {answer.content}
        </div>
        <div className={s.answer_bottom}>
          <Typography variant={'small_text'} className={s.item_answer_date}>
            {formatDistanceToNow(new Date(answer.createdAt))}
          </Typography>
          {answer.likeCount > 0 && (
            <Typography variant={'semi-bold_small_text'} asChild>
              <span className={s.answer_like_count}>Like: {answer.likeCount} </span>
            </Typography>
          )}
        </div>
        <Button
          variant={'icon'}
          onClick={() => onLike(answer.id, answer.isLiked)}
          className={s.like_btn}
        >
          {answer.isLiked ? (
            <HeartIcon width={16} height={16} className={s.like_on} />
          ) : (
            <HeartOutlineIcon width={16} height={16} />
          )}
        </Button>
      </div>
    </li>
  )
}
