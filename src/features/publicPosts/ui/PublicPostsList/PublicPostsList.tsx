'use client'
import s from './PublicPostsList.module.scss'
import { useState } from 'react'
import { Post } from '@/shared/api/post/postApi.types'
import { Typography } from '@/shared/ui/typography'
import { formatDistanceToNow } from 'date-fns'
import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { PublicPostImages } from '@/features/publicPosts/ui/PublicPostsList/PublicPostImages'
import { PublicPostDescription } from '@/features/publicPosts/ui/PublicPostsList/PublicPostDescription'
import Image from 'next/image'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'

type PublicPostsList = {
  items: Post[]
}
 export const WIDTH_AVATAR = 36
export const HEIGHT_AVATAR = 36

export const PublicPostsList = ({ items }: PublicPostsList) => {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedPostId(expandedPostId === id ? null : id)
  }

  return (
    <>
      <ul className={s.public_posts}>
        {items.map(item => {
          const isExpanded = expandedPostId === String(item.id)
          return (
            <li key={item.id} className={`${s.public_post} ${isExpanded ? s.expanded : ''}`}>
              <div className={s.public_posts_img}>
                {item.images.length > 0 ? (
                  <PublicPostImages
                    images={item.images}
                    postId={String(item.id)}
                    isExpanded={isExpanded}
                  />
                ) : (
                  <div className={s.placeholder}>No Image</div>
                )}
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
                  <div className={s.public_post_description}>
                    <PublicPostDescription
                      description={item.description}
                      isExpanded={isExpanded}
                      onToggleExpand={() => toggleExpand(String(item.id))}
                    />
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}
