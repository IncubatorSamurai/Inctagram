import React from 'react'
import { CustomSlider } from '@/shared/ui/customSlider/CustomSlider'
import Image from 'next/image'
import { ImageProps } from '@/shared/api/pageHome/pageHomeApi.types'
import s from './HomePostImages.module.scss'

type Props = {
  images: ImageProps[]
  postId: number
  ownerUserName: string
}

export const HomePostImages = ({ images, postId, ownerUserName }: Props) => {
  return (
    <div className={s.postImages}>
      <CustomSlider className={s.publicSlider}>
        {images.map((image, index) => (
          <Image
            key={`${postId}-${index}`}
            src={image.url}
            alt={`Image for post ${ownerUserName}`}
            fill
            sizes="(max-width: 768px) 100vw"
            className={s.post_img}
            priority
          />
        ))}
      </CustomSlider>
    </div>
  )
}
