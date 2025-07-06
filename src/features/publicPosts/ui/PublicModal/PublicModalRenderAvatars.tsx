import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import s from './PublicModalRenderAvatars.module.scss'
import Image from 'next/image'

const WIDTH_AVATAR = 36
const HEIGHT_AVATAR = 36
export const renderLikeAvatars = (likesCount: number, avatarWhoLikes: string[] | boolean) => {
  // Проверяем, что avatarWhoLikes — это массив так как в свагере возвращается пустой массив либо false
  if (likesCount > 0 && Array.isArray(avatarWhoLikes)) {
    return Array.from({ length: likesCount }).map((_, index) => (
      <li key={index} className={s.avatar_like_item}>
        {avatarWhoLikes[index] ? (
          <Image
            src={avatarWhoLikes[index]}
            alt={`User aАvatar ${index}`}
            width={WIDTH_AVATAR}
            height={HEIGHT_AVATAR}
          />
        ) : (
          <NoAvatar />
        )}
      </li>
    ))
  }
  return <NoAvatar />
}
