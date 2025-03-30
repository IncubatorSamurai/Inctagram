'use client'
import s from './PublicPostsList.module.scss'
import { Post } from '@/shared/api/post/postApi.types'
import { PublicPostItem } from '@/features/publicPosts/ui/PublicPostsList/PublicPostItem/PublicPostItem'

type PublicPostsList = {
  items: Post[]
}

export const PublicPostsList = ({ items }: PublicPostsList) => {
  return (
    <>
      <ul className={s.public_posts}>
        {items.map(item => {
          return <PublicPostItem item={item} key={String(item.id)} />
        })}
      </ul>
    </>
  )
}
