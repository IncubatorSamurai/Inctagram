import React from 'react'
import { MessageCircleOutlineIcon } from '@/shared/assets/icons/MessageCircleOutlineIcon'
import { PaperPlaneIcon } from '@/shared/assets/icons/PaperPlaneIcon'
import { BookMarkOutlineIcon } from '@/shared/assets/icons/BookMarkOutlineIcon'
import Image from 'next/image'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { Typography } from '@/shared/ui/typography'
import s from './HomePostInteraction.module.scss'

import { PostInteraction } from '@/shared/api/pageHome/pageHomeApi.types'
import { LikePost } from '@/features/post-like/LikePost/LikePost'

type Props = {
  WIDTH_AVATAR: number
  HEIGHT_AVATAR: number
  ownerUserName: string
} & PostInteraction

export const HomePostInteraction = (props: Props) => {
  const { isLiked, description, avatarOwner, WIDTH_AVATAR, HEIGHT_AVATAR, ownerUserName, id } =
    props

  return (
    <>
      <div className={s.postFunctions}>
        <LikePost isLiked={isLiked} id={id} />
        <MessageCircleOutlineIcon />
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
