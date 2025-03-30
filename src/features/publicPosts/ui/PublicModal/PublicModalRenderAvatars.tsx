import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import s from './PublicModal.module.scss'
import Image from 'next/image'
import { HEIGHT_AVATAR, WIDTH_AVATAR } from '@/features/publicPosts/ui/PublicPostsList'

export const renderLikeAvatars = (likesCount: number, avatarWhoLikes: string[] | boolean) => {
  // Проверяем, что avatarWhoLikes — это массив так как в свагере возвращается пустой массив либо false
  if (likesCount > 0 && Array.isArray(avatarWhoLikes)) {
    return Array.from({ length: likesCount }).map((_, index) => (
      <li key={index} className={s.avatar_like_item}>
        {avatarWhoLikes[index] ? (
          <Image
            src={avatarWhoLikes[index]}
            alt={`User avatar ${index}`}
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
