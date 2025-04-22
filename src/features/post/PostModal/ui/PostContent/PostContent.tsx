import { Scrollbar } from '@/shared/ui/scrollbar'
import { AddComment } from '../AddComment/AddComment'
import { PostLikesAndSent } from '../PostLikesAndSent/PostLikesAndSent'
import { PostComment } from './PostComment/PostComment'
import { Typography } from '@/shared/ui/typography'
import s from './PostContent.module.scss'

// type Optional<T> = T | undefined
type PostContentProps = {
  post: string
  likes: number | undefined
  whosLikes: string[] | undefined
  updatedAt: string | undefined
  createdAt: string | undefined
}

export const PostContent = ({ post, likes, whosLikes, updatedAt, createdAt }: PostContentProps) => {
  //надо конвертировать дату в нормальный вид
  //доделать чтоб были картинки тех кто лайкнул как на макете
  const userImg =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VbvTvQFYrD7AYI3IKB8rdP-vvYm2LkBl-w&s'
  return (
    <div className={s.postsSide}>
      <Scrollbar className={s.postsSideContent}>
        <div className={s.postDescription}>
          <div className={s.topContent}>
            <img src={userImg} alt="postOwnerImg" />
            <Typography variant="bold_text_14">URLProfiele {post}</Typography>
          </div>
          <div className={s.sideInfo}>{updatedAt}</div>
        </div>
        <PostComment />
        <PostComment />
        {/* тут будет map по всем комментариям к этому посту */}
      </Scrollbar>
      <PostLikesAndSent likes={likes} whosLikes={whosLikes} createdAt={createdAt} />
      <AddComment />
    </div>
  )
}
