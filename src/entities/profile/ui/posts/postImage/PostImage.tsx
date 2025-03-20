import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import s from './PostImage.module.scss'
import { ImageModel } from '@/shared/api/post/postApi.types'

type Props = {
  className?: string
  fill?: boolean
  height?: number
  images: ImageModel[]
  width?: number
} & ComponentPropsWithoutRef<'div'>

export const PostImage = forwardRef<HTMLDivElement, Props>(({ className, fill, images }, ref) => {
  const classNames = {
    container: clsx(s.container, className),
    image: s.image,
  }

  return (
    <div className={classNames.container} ref={ref}>
      <Image
        alt={'postImage'}
        className={classNames.image}
        fill={fill}
        src={images[0]?.url}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />
    </div>
  )
})

PostImage.displayName = 'PostImage'
