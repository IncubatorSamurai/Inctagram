'use client'
import s from './PublicPostsList.module.scss'
import Image from 'next/image'
import Slider from 'react-slick'
import Link from 'next/link'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
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
}
const WIDTH_PUBLIC_IMAGE = 234
const HEIGHT_PUBLIC_IMAGE = 240
const EXPANDED_PUBLIC_IMAGE = 120

export const PublicPostImages = ({ images, postId, isExpanded }: SliderImagesProps) => {
  const { settings } = useSliderSettings({
    sliderClass: s.slider_public,
    dotsClass: s.slider_public_dots,
    arrowsClassPrev: s.slider_public_prev,
    arrowsClassNext: s.slider_public_next,
  })

  return (
    <div className={s.slider_container}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Link
            key={`${postId}-${index}`}
            href={`/public?postId=${postId}`}
            as={`/public/?postId=${postId}`}
            className={s.post_link}
            scroll={false}
          >
            <div key={`${postId}-${index}`} className={s.slickSlide}>
              {image.url ? (
                <Image
                  src={image.url}
                  alt={`Image ${index}`}
                  width={WIDTH_PUBLIC_IMAGE}
                  height={isExpanded ? EXPANDED_PUBLIC_IMAGE : HEIGHT_PUBLIC_IMAGE}
                  className={isExpanded ? s.expanded_image : s.post_img}
                />
              ) : (
                <ImageOutlineIcon />
              )}
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}
