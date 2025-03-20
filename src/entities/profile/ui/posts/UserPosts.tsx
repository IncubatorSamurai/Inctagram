import React from 'react'
import s from './UserPosts.module.scss'
import { useGetPosts } from '@/entities/profile/model/useGetPosts'
import { PostImage } from '@/entities/profile/ui/posts/postImage/PostImage'
import { Link } from '@/i18n/routing'

type Props = {
  userName: string
  userId: string
}

export const UserPosts = ({ userName, userId }: Props) => {
  const { posts, targetRef } = useGetPosts({ userName })

  return (
    <section className={s.posts}>
      {userName &&
        posts.map((post, id) => (
          <div
            key={post.id}
            className={s.postWrapper}
            ref={id === posts.length - 1 ? targetRef : null}
          >
            <Link href={`/profile/${userId}/${post.id}`} shallow={true} scroll={false}>
              <PostImage images={post.images} fill />
            </Link>
          </div>
        ))}
    </section>
  )
}
