import React from 'react'
import s from './homePost.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Post } from '@/shared/api/pageHome/pageHomeApi.types'
import { useGetUserQuery } from '@/shared/api/users/usersApi'
import {
  HeaderHomePost,
  HomePostImages,
  HomePostInteraction,
  HomePostLikes,
} from '@/features/home/ui'
import { AddContent } from '@/features/post/PostModal/ui/AddComment/AddComment'
import { formatDistanceToNow } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import { useLocale, useTranslations } from 'next-intl'
import { useAddComment } from '@/shared/hooks/useAddComment'
import { useGetCommentsByPostIdQuery } from '@/shared/api/post/postApi'

const WIDTH_AVATAR = 36
const HEIGHT_AVATAR = 36

export const HomePost = ({ ...props }: Post) => {
  const tFeed = useTranslations('feed')
  const locale = useLocale()
  const lang = locale === 'en' ? enUS : ru
  const userId = props.ownerId
  const avatarOwner = props.avatarOwner
  const ownerUserName = props.userName

  const createdAt = formatDistanceToNow(new Date(props.createdAt), {
    addSuffix: true,
    locale: lang,
  })

  const postId = String(props.id)
  const description = props.description
  const isLiked = props.isLiked
  const likesCount = props.likesCount

  const images = props.images

  const avatarWhoLikes = props.avatarWhoLikes

  const { data: user } = useGetUserQuery({
    userName: ownerUserName,
  })

  const isFollowing = user?.isFollowing ?? false

  const { changeTextarea, comment, submitComment } = useAddComment(postId)
  const { data: commentsData } = useGetCommentsByPostIdQuery({ postId: props.id })

  const stateComments =
    commentsData?.totalCount === 0 ? tFeed('noComments') : tFeed('viewAllComments')

  const countComments = commentsData?.totalCount ? `(${commentsData?.totalCount})` : null

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
          {stateComments} {countComments}
        </Typography>
        <AddContent
          className={s.addComment}
          placeholder={'Comment'}
          onPublish={submitComment}
          onChange={changeTextarea}
          value={comment}
        />
      </div>
    </div>
  )
}
