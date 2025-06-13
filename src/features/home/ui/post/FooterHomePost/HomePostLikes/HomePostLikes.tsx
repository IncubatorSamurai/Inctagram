import React from 'react'
import s from './HomePostLikes.module.scss'
import Image from 'next/image'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { Typography } from '@/shared/ui/typography'

type Props = {
  avatarWhoLikes: string[]
  likesCount: number
}

export const HomePostLikes = ({ avatarWhoLikes, likesCount }: Props) => {
  return (
    <div className={s.likes}>
      {avatarWhoLikes.slice(0, 3).map((avatar, index) => {
        return avatar ? (
          <Image
            key={index}
            className={s.imgWhoLikes}
            src={avatar}
            alt="avatar"
            width={24}
            height={24}
          ></Image>
        ) : (
          <NoAvatar key={index} />
        )
      })}
      <Typography style={{ marginLeft: avatarWhoLikes.length > 0 ? 12 : 0 }}>
        {likesCount} &quot;<b>Like</b>&quot;
      </Typography>
    </div>
  )
}
