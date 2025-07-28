import React from 'react'
import { MessageCircleOutlineIcon } from '@/shared/assets/icons/MessageCircleOutlineIcon'
import { PaperPlaneIcon } from '@/shared/assets/icons/PaperPlaneIcon'
import { BookMarkOutlineIcon } from '@/shared/assets/icons/BookMarkOutlineIcon'
import Image from 'next/image'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { Typography } from '@/shared/ui/typography'
import s from './HomePostInteraction.module.scss'
import { Link } from '@/i18n/routing'
import { LikePost } from '@/features/post/PostModal/ui/PostLikesAndSent/LikePost/LikePost'
import { useGetPostLikesQuery } from '@/shared/api/post/likes/postLikeApi'

type Props = {
  postId: string
  avatarOwner: string
  WIDTH_AVATAR: number
  HEIGHT_AVATAR: number
  description: string
  ownerUserName: string
  hrefLinkPost: string
}

export const HomePostInteraction = ({
  postId,
  description,
  avatarOwner,
  WIDTH_AVATAR,
  HEIGHT_AVATAR,
  ownerUserName,
  hrefLinkPost,
}: Props) => {
  const { data: likesData } = useGetPostLikesQuery(postId ?? '', { skip: !postId })

  return (
    <>
      <div className={s.postFunctions}>
        <LikePost id={postId ?? ''} likesItems={likesData?.items} />
        <Link href={hrefLinkPost} shallow scroll={false}>
          <MessageCircleOutlineIcon className={s.linkIcon} />
        </Link>
        <PaperPlaneIcon />
        <BookMarkOutlineIcon />
      </div>
      <div className={s.description}>
        {avatarOwner ? (
          <Image
            className={s.avatar}
            src={avatarOwner}
            alt="avatarOwner"
            width={WIDTH_AVATAR}
            height={HEIGHT_AVATAR}
          />
        ) : (
          <NoAvatar />
        )}
        <Typography>
          <b>{ownerUserName}</b> {description}
        </Typography>
      </div>
    </>
  )
}
