'use client'
import Link from 'next/link'
import s from './PublicPostImages.module.scss'
import { CustomSlider } from '@/shared/ui/customSlider/CustomSlider'
import Image from 'next/image'

export type ImageModel = {
  url: string
  width: number
  height: number
}

export type SliderImagesProps = {
  images: ImageModel[]
  postId: string
  isExpanded: boolean
  userName: string
}

const WIDTH_PUBLIC_IMAGE = 234
const HEIGHT_PUBLIC_IMAGE = 240
const EXPANDED_PUBLIC_IMAGE = 120

export const PublicPostImages = ({ userName, images, postId, isExpanded }: SliderImagesProps) => {
  return (
    <div className={s.slider_container}>
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
              alt={`Image for post ${userName}`}
              width={WIDTH_PUBLIC_IMAGE}
              height={isExpanded ? EXPANDED_PUBLIC_IMAGE : HEIGHT_PUBLIC_IMAGE}
              className={isExpanded ? s.expanded_image : s.post_img}
            />
          </Link>
        ))}
      </CustomSlider>
    </div>
  )
}
