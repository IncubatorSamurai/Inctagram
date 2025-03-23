import { BookMarkOutlineIcon } from '@/shared/assets/icons/BookMarkOutlineIcon'
import { HeartOutlineIcon } from '@/shared/assets/icons/HeartOutlineIcon'
import { PaperPlaneIcon } from '@/shared/assets/icons/PaperPlaneIcon'
import s from './PostLikesAndSent.module.scss'

export const PostLikesAndSent = () => {
  const count = 200
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
        <div>img user who like this</div>
        <div>
          {count} <span>like</span>
        </div>
        <div>info</div>
      </div>
    </div>
  )
}
