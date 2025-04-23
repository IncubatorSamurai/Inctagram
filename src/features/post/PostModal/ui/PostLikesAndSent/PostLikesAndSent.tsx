import { BookMarkOutlineIcon } from '@/shared/assets/icons/BookMarkOutlineIcon'
import { HeartOutlineIcon } from '@/shared/assets/icons/HeartOutlineIcon'
import { PaperPlaneIcon } from '@/shared/assets/icons/PaperPlaneIcon'
import s from './PostLikesAndSent.module.scss'
import Image from 'next/image'
import { parseIsoDate } from '@/shared/utils'

type LikesAndCountProps = {
  likes: number | undefined
  whosLikes: string[] | undefined
  createdAt: string | undefined
}

export const PostLikesAndSent = ({ likes, whosLikes, createdAt }: LikesAndCountProps) => {
  const data = createdAt && parseIsoDate(createdAt)
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
        {whosLikes?.map(el => (
          <Image
            key={el}
            className={s.imgWhoLikes}
            src={el}
            alt="user post"
            width={24}
            height={24}
          />
        ))}
        {likes} <span>like</span>
      </div>
      <div>{data}</div>
    </div>
  )
}
