import React from 'react'
import s from './UserPosts.module.scss'
import { useGetPosts } from '@/entities/profile/model/useGetPosts'
import { PostImage } from '@/entities/profile/ui/posts/postImage/PostImage'
import { Link } from '@/i18n/routing'
import { GetPostsByUserIdRespond } from '@/shared/api/post/postApi.types'

type Props = {
  userName: string
  userId: string
  resPublicPosts?: GetPostsByUserIdRespond
}

export const UserPosts = ({ userName, userId, resPublicPosts }: Props) => {
  const { posts, targetRef, isLoggedIn } = useGetPosts({ userName, resPublicPosts })

  return (
    <section className={s.posts}>
      {userName &&
        posts?.map((post, id) => {
          const hrefLinkPost = `/${isLoggedIn ? 'profile' : 'users'}/${userId}/${post.id}`

          return (
            <div
              key={post.id}
              className={s.postWrapper}
              ref={id === posts.length - 1 ? targetRef : null}
            >
              <Link href={hrefLinkPost} shallow={true} scroll={false}>
                <PostImage images={post.images} fill />
              </Link>
            </div>
          )
        })}
    </section>
  )
}
