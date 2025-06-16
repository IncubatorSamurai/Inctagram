import React from 'react'
import Image from 'next/image'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { Typography } from '@/shared/ui/typography'
import { Dropdown } from '@/shared/ui/dropdown'
import { MoreHorizontalIcon } from '@/shared/assets/icons/MoreHorizontalIcon'
import { FollowButton } from '@/features/followUser'
import { Button } from '@/shared/ui/button'
import { CopyIcon } from '@/shared/assets/icons/CopyIcon'
import s from './HomePostHeader.module.scss'

type Props = {
  avatarOwner: string
  WIDTH_AVATAR: number
  HEIGHT_AVATAR: number
  ownerUserName: string
  createdAt: string
  userId: number
  isFollowing: boolean
}

export const HeaderHomePost = ({
  createdAt,
  avatarOwner,
  WIDTH_AVATAR,
  HEIGHT_AVATAR,
  ownerUserName,
  userId,
  isFollowing,
}: Props) => {
  return (
    <div className={s.header}>
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
      <Typography variant={'h3'}>{ownerUserName}</Typography>
      <div className={s.dot}></div>
      <Typography variant={'small_text'} className={s.postTime}>
        {createdAt}
      </Typography>
      <Dropdown iconTrigger={<MoreHorizontalIcon />} classItemsContainer={s.dropDownContainer}>
        <FollowButton
          userId={userId}
          userName={ownerUserName}
          isFollowing={isFollowing}
          variant={'icon'}
        />
        <Button variant={'icon'}>
          <CopyIcon />
          <Typography variant={'regular_text_14'}>Copy Link</Typography>
        </Button>
      </Dropdown>
    </div>
  )
}
