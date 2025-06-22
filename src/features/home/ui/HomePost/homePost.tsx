import React from 'react'
import s from './homePost.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Post } from '@/shared/api/pageHome/pageHomeApi.types'
import { parseIsoDate } from '@/shared/utils'
import { useGetUserQuery } from '@/shared/api/users/usersApi'
import {
  HeaderHomePost,
  HomePostImages,
  HomePostInteraction,
  HomePostLikes,
} from '@/features/home/ui'
import { AddContent } from '@/features/post/PostModal/ui/AddComment/AddComment'

const WIDTH_AVATAR = 36
const HEIGHT_AVATAR = 36

export const HomePost = ({ ...props }: Post) => {
  const userId = props.ownerId
  const avatarOwner = props.avatarOwner
  const ownerUserName = props.userName
  const createdAt = parseIsoDate(props.createdAt)
  const postId = props.id
  const description = props.description
  const isLiked = props.isLiked
  const likesCount = props.likesCount

  const images = props.images

  const avatarWhoLikes = props.avatarWhoLikes

  const { data: user } = useGetUserQuery({
    userName: ownerUserName,
  })

  const isFollowing = user?.isFollowing ?? false

  return (
    <div className={s.container}>
      <HeaderHomePost
        avatarOwner={avatarOwner}
        WIDTH_AVATAR={WIDTH_AVATAR}
        HEIGHT_AVATAR={HEIGHT_AVATAR}
        ownerUserName={ownerUserName}
        createdAt={createdAt}
        userId={userId}
        isFollowing={isFollowing}
      />
      <HomePostImages postId={postId} images={images} ownerUserName={ownerUserName} />
      <div className={s.footer}>
        <HomePostInteraction
          isLiked={isLiked}
          avatarOwner={avatarOwner}
          WIDTH_AVATAR={WIDTH_AVATAR}
          HEIGHT_AVATAR={HEIGHT_AVATAR}
          description={description}
          ownerUserName={ownerUserName}
        />
        <HomePostLikes avatarWhoLikes={avatarWhoLikes} likesCount={likesCount} />
        <Typography variant={'bold_text_14'} className={s.viewComments}>
          View All Comments (114)
        </Typography>
        <AddContent className={s.addComment} placeholder={'comment'} />
      </div>
    </div>
  )
}
