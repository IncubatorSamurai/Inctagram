'use client'
import s from './PublicModal.module.scss'
import { Comment, ImageModel } from '@/shared/api/post/postApi.types'
import { Modal } from '@/shared/ui/modal'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography'
import { Scrollbar } from '@/shared/ui/scrollbar'
import { format } from 'date-fns'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CommentItem } from '@/features/publicPosts/ui/PublicModal/CommentItem/CommentItem'
import { useRouter } from 'next/navigation'

import { useSliderSettings } from '@/shared/ui/slider/CustomSlider'
import { renderLikeAvatars } from '@/features/publicPosts/ui/PublicModal/PublicModalRenderAvatars'
const WIDTH_MODAL_IMAGE = 490
const HEIGHT_MODAL_IMAGE = 564
type PublicModal = {
  images: ImageModel[]
  userName: string
  comments: Comment[]
  postId: number
  avatarOwner: string
  likesCount: number
  createdAt: string
  avatarWhoLikes: boolean
}

export const PublicModal = ({
  createdAt,
  avatarWhoLikes,
  likesCount,
  userName,
  avatarOwner,
  images,
  postId,
  comments,
  ...props
}: PublicModal) => {
  const { settings } = useSliderSettings({})
  const router = useRouter()
  const onClose = () => {
    if (window.history.length > 2) {
      router.back()
    } else {
      router.replace('/public')
    }
  }
  return (
    <Modal
      className={s.public_modal}
      open={!!postId}
      onOpenChange={onClose}
      defaultOpen={true}
      {...props}
    >
      <div className={s.public_modal_container}>
        <div className={s.public_modal_img}>
          {/* СЛАЙДЕР*/}
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <Image src={image.url} alt="" width={WIDTH_MODAL_IMAGE} height={HEIGHT_MODAL_IMAGE} />
              </div>
            ))}
          </Slider>
        </div>
        {/*-------*/}
        <div className={s.public_modal_content}>
          <div className={s.public_content_title}>
            {avatarOwner ? (
              <Image src={avatarOwner} alt="avatarOwner" width={36} height={36} />
            ) : (
              <NoAvatar />
            )}
            <Typography variant={'h3'}>{userName}</Typography>
          </div>
          {/*КОММЕНТАРИИ*/}
          <ul className={s.public_content_list}>
            <Scrollbar className={s.modal_scroll}>
              {comments?.length > 0 ? (
                comments.map(comment => <CommentItem key={comment.id} comment={comment} />)
              ) : (
                <li>No comments</li>
              )}
            </Scrollbar>
          </ul>
          {/*--------*/}
          <div className={s.public_content_footer}>
            <div className={s.public_footer_likes}>
              <ul className={s.public_footer_avatars}>
                {renderLikeAvatars(likesCount, avatarWhoLikes)}
              </ul>
              <div className={s.likes}>
                {likesCount}
                <Typography variant={'bold_text_14'}>&quot;Like&quot;</Typography>
              </div>
            </div>
            <Typography variant={'small_text'} className={s.item_comment_date}>
              {format(new Date(createdAt), 'MMMM d, yyyy')}
            </Typography>
          </div>
        </div>
      </div>
    </Modal>
  )
}
