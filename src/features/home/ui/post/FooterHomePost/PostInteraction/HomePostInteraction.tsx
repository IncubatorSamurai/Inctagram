import React from 'react'
import { HeartIcon } from '@/shared/assets/icons/HeartIcon'
import { HeartOutlineIcon } from '@/shared/assets/icons/HeartOutlineIcon'
import { MessageCircleOutlineIcon } from '@/shared/assets/icons/MessageCircleOutlineIcon'
import { PaperPlaneIcon } from '@/shared/assets/icons/PaperPlaneIcon'
import { BookMarkOutlineIcon } from '@/shared/assets/icons/BookMarkOutlineIcon'
import Image from 'next/image'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { Typography } from '@/shared/ui/typography'
import s from './HomePostInteraction.module.scss'

type Props = {
  isLiked: boolean
  avatarOwner: string
  WIDTH_AVATAR: number
  HEIGHT_AVATAR: number
  description: string
  ownerUserName: string
}

export const HomePostInteraction = ({
  isLiked,
  description,
  avatarOwner,
  WIDTH_AVATAR,
  HEIGHT_AVATAR,
  ownerUserName,
}: Props) => {
  return (
    <>
      <div className={s.postFunctions}>
        {isLiked ? <HeartIcon color={'red'} /> : <HeartOutlineIcon />}
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
