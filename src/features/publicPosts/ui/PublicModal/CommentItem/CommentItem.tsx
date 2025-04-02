// CommentItem.tsx
import { Comment } from '@/shared/api/post/postApi.types'; // Путь может отличаться
import Image from 'next/image';
import { Typography } from '@/shared/ui/typography';
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar';
import { formatDistanceToNow } from 'date-fns';
import s from "./CommentItem.module.scss"

const WIDTH_AVATAR = 36
const HEIGHT_AVATAR = 36

type CommentItemProps = {
  comment: Comment;
};

export const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <li key={comment.id} className={s.public_content_item}>
      <div className={s.public_item_img}>
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
      <div>
        <div className={s.public_item_comment}>
          <Typography variant={'bold_text_14'} asChild>
            <span>{comment.from.username}</span>
          </Typography>
          {comment.content}
        </div>

        <Typography variant={'small_text'} className={s.item_comment_date}>
          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
        </Typography>

        {comment.answerCount > 0 && (
          <span className={s.comment_answer}>
            View Answers ({comment.answerCount})
          </span>
        )}
      </div>
    </li>
  );
};


