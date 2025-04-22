import { BookMarkOutlineIcon } from '@/shared/assets/icons/BookMarkOutlineIcon'
import { HeartOutlineIcon } from '@/shared/assets/icons/HeartOutlineIcon'
import { PaperPlaneIcon } from '@/shared/assets/icons/PaperPlaneIcon'
import s from './PostLikesAndSent.module.scss'

type LikesAndCountProps = {
  likes: number | undefined
  whosLikes: string[] | undefined
  createdAt: string | undefined
}

export const PostLikesAndSent = ({ likes, whosLikes, createdAt }: LikesAndCountProps) => {
  return (
    <div className={s.postsSideLikes}>
      <div className={s.likeAndSent}>
        <div className={s.likeS}>
          <HeartOutlineIcon />
          <PaperPlaneIcon />
        </div>
        <div>
          <BookMarkOutlineIcon />
        </div>
      </div>
      <div className={s.info}>
        <div className={s.imgWhoLikes}>
          {whosLikes?.map(el => <img key={el} src={el} alt="user post" />)}
        </div>
        <div>
          {likes} <span>like</span>
        </div>
        <div>{createdAt}</div>
      </div>
    </div>
  )
}
