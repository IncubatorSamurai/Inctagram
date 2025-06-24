import React from 'react'
import s from './UserPosts.module.scss'
import { useGetPosts } from '@/entities/profile/model/useGetPosts'
import { PostImage } from '@/entities/profile/ui/posts/postImage/PostImage'
import { Link } from '@/i18n/routing'
import { GetPostsByUserIdRespond } from '@/shared/api/post/postApi.types'
import { Typography } from '@/shared/ui/typography'

type Props = {
  userId: string
  resPublicPosts?: GetPostsByUserIdRespond
}

export const UserPosts = ({ userId, resPublicPosts }: Props) => {
  const { posts, lastPostElementRef, isFetching } = useGetPosts({ resPublicPosts })
  const renderPosts = posts ?? resPublicPosts?.items
  return (
    <section className={s.posts}>
      {renderPosts?.map((post, id) => {
        const hrefLinkPost = `/profile/${userId}?postId=${post.id}`

        return (
          <div
            key={post.id}
            className={s.postWrapper}
            ref={id === renderPosts.length - 1 ? lastPostElementRef : null}
          >
            <Link href={hrefLinkPost} shallow scroll={false}>
              <PostImage images={post.images} fill />
            </Link>
          </div>
        )
      })}
      <div className={s.loading}>
        {isFetching && <Typography variant={'h1'}>Loading...</Typography>}
      </div>
    </section>
  )
}
