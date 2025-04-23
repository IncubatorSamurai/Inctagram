import { useState } from 'react'
import s from './PublicPostItem.module.scss'
import { PublicPostImages } from '@/features/publicPosts/ui/PublicPostsList/PublicPostImages/PublicPostImages'
import Image from 'next/image'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { Typography } from '@/shared/ui/typography'
import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { formatDistanceToNow } from 'date-fns'
import { PublicPostDescription } from '@/features/publicPosts/ui/PublicPostsList/PostDescription/PublicPostDescription'
import { Post } from '@/shared/api/post/postApi.types'

const WIDTH_AVATAR = 36
const HEIGHT_AVATAR = 36

type PublicPostItem = {
  item: Post
}

export const PublicPostItem = ({ item }: PublicPostItem) => {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)

  const toggleExpand = (postId: string) => {
    setExpandedPostId(prev => (prev === postId ? null : postId))
  }
  const isExpanded = expandedPostId === String(item.id)

  return (
    <li key={item.id} className={`${s.public_post} ${isExpanded ? s.expanded : ''}`}>
      <div className={s.public_posts_img}>
        <PublicPostImages
          userName={item.userName}
          images={item.images}
          postId={String(item.id)}
          isExpanded={isExpanded}
        />
      </div>

      <div className={s.public_posts_content}>
        <div className={s.public_post_name}>
          {item.avatarOwner ? (
            <Image
              className={s.public_post_avatar}
              src={item.avatarOwner}
              alt="User avatar"
              width={WIDTH_AVATAR}
              height={HEIGHT_AVATAR}
            />
          ) : (
            <NoAvatar />
          )}
          <Typography variant={'h3'}>{item.userName}</Typography>
          {isExpanded && <BlockIcon />}
        </div>

        <div className={s.public_post_description}>
          <Typography variant={'small_text'} className={s.public_post_data}>
            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
          </Typography>

          <PublicPostDescription
            description={item.description}
            isExpanded={isExpanded}
            onToggleExpand={() => toggleExpand(String(item.id))}
          />
        </div>
      </div>
    </li>
  )
}
