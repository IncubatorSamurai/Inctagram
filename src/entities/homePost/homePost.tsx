import React from 'react'
import s from './homePost.module.scss'
import { Typography } from '@/shared/ui/typography'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { MoreHorizontalIcon } from '@/shared/assets/icons/MoreHorizontalIcon'
import { HeartOutlineIcon } from '@/shared/assets/icons/HeartOutlineIcon'
import { MessageCircleOutlineIcon } from '@/shared/assets/icons/MessageCircleOutlineIcon'
import { PaperPlaneIcon } from '@/shared/assets/icons/PaperPlaneIcon'
import { BookMarkOutlineIcon } from '@/shared/assets/icons/BookMarkOutlineIcon'
import Image from 'next/image'
import { Button } from '@/shared/ui/button'
import { Post } from '@/shared/api/pageHome/pageHomeApi.types'
import { parseIsoDate } from '@/shared/utils'
import { CustomSlider } from '@/shared/ui/customSlider/CustomSlider'
import Link from 'next/link'
import { HeartIcon } from '@/shared/assets/icons/HeartIcon'

const WIDTH_AVATAR = 36
const HEIGHT_AVATAR = 36

export const HomePost = ({ ...props }: Post) => {
  const avatarOwner = props.avatarOwner
  const ownerUserName = props.userName
  const createdAt = parseIsoDate(props.createdAt)
  const postId = props.id
  const description = props.description
  const isLiked = props.isLiked
  const likesCount = props.likesCount

  const images = props.images

  const avatarWhoLikes = props.avatarWhoLikes

  return (
    <div className={s.container}>
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
        <MoreHorizontalIcon />
      </div>
      <div className={s.postImages}>
        <CustomSlider className={s.publicSlider}>
          {images.map((image, index) => (
            <Link
              key={`${postId}-${index}`}
              href={`/?postId=${postId}`}
              as={`/?postId=${postId}`}
              className={s.post_link}
              scroll={false}
            >
              <Image
                src={image.url}
                alt={`Image for post ${ownerUserName}`}
                fill
                className={s.post_img}
              />
            </Link>
          ))}
        </CustomSlider>
      </div>
      <div className={s.footer}>
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
        <div className={s.likes}>
          {avatarWhoLikes.map((avatar, index) => {
            return (
              <Image
                key={index}
                className={s.imgWhoLikes}
                src={avatar}
                alt="avatar"
                width={24}
                height={24}
              ></Image>
            )
          })}
          <Typography style={{ marginLeft: avatarWhoLikes.length > 0 ? 12 : 0 }}>
            {likesCount} &quot;<b>Like</b>&quot;
          </Typography>
        </div>
        <Typography variant={'bold_text_14'} className={s.viewComments}>
          View All Comments (114)
        </Typography>
        <div className={s.addComment}>
          <textarea maxLength={500} placeholder="Add a Comment..." rows={1}></textarea>
          <Button name="Publish" variant="text">
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
