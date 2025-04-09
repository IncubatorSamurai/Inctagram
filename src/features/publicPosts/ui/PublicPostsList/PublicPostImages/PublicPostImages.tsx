'use client'
import s from './PublicPostImages.module.scss'
import Image from 'next/image'
import Slider from 'react-slick'
import Link from 'next/link'
import { useSliderSettings } from '@/shared/ui/slider/CustomSlider'

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
  const { settings } = useSliderSettings({
    sliderClass: s.slider_public,
    dotsClass: s.slider_public_dots,
    arrowsClass: s.slider_public_arrows,
    totalSlides: images.length,
  })

  return (
    <div className={s.slider_container}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Link
            key={`${postId}-${index}`}
            href={`/?postId=${postId}`}
            as={`/?postId=${postId}`}
            className={s.post_link}
            scroll={false}
          >
            <div key={`${postId}-${index}`} className={s.slickSlide}>
              <Image
                src={image.url}
                alt={`Image for post ${userName}`}
                width={WIDTH_PUBLIC_IMAGE}
                height={isExpanded ? EXPANDED_PUBLIC_IMAGE : HEIGHT_PUBLIC_IMAGE}
                className={isExpanded ? s.expanded_image : s.post_img}
              />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}
