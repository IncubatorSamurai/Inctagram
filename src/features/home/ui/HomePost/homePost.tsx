import React from 'react'
import s from './homePost.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Post } from '@/shared/api/pageHome/pageHomeApi.types'
import { useGetUserQuery } from '@/shared/api/users/usersApi'
import { HeaderHomePost, HomePostImages, HomePostInteraction } from '@/features/home/ui'
import { AddContent } from '@/features/post/PostModal/ui/AddComment/AddComment'
import { PostLikesAvatars } from '@/features/post-like/PostLikesAvatars/PostLikesAvatars'
import { formatDistanceToNow } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import { useLocale, useTranslations } from 'next-intl'
import { useAddComment } from '@/shared/hooks/useAddComment'
import { useGetCommentsByPostIdQuery } from '@/shared/api/post/postApi'
import { Link } from '@/i18n/routing'

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

  const postId = props.id
  const description = props.description

  const images = props.images

  const { data: user } = useGetUserQuery({
    userName: ownerUserName,
  })

  const isFollowing = user?.isFollowing ?? false

  const { changeTextarea, comment, submitComment } = useAddComment(String(postId))
  const { data: commentsData } = useGetCommentsByPostIdQuery({ postId: props.id })

  const stateComments =
    commentsData?.totalCount === 0 ? tFeed('noComments') : tFeed('viewAllComments')

  const countComments = commentsData?.totalCount ? `(${commentsData?.totalCount})` : null

  const hrefLinkPost = `/feed?postId=${postId}`

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
          id={postId}
          avatarOwner={avatarOwner}
          WIDTH_AVATAR={WIDTH_AVATAR}
          HEIGHT_AVATAR={HEIGHT_AVATAR}
          description={description}
          ownerUserName={ownerUserName}
          hrefLinkPost={hrefLinkPost}
        />
        <PostLikesAvatars id={postId} />
        <Link href={hrefLinkPost} shallow scroll={false} className={s.link}>
          <Typography variant={'bold_text_14'} className={s.viewComments}>
            {stateComments} {countComments}
          </Typography>
        </Link>
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
