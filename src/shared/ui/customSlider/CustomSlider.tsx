'use client'
import s from './CustomSlider.module.scss'
import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { ArrowIosForwardIcon } from '@/shared/assets/icons/ArrowIosForwardIcon'
import { ArrowIosBackIcon } from '@/shared/assets/icons/ArrowIosBackIcon'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

type Props = {
  className?: string
  classNameSlide?: string
  children?: ReactNode
  navigation?: boolean
} & SwiperProps

export const CustomSlider = ({
  children,

  classNameSlide,
  className,

  navigation = true,
  ...swiperProps
}: Props) => {
  return (
    <Swiper
      className={clsx(s.custom_slider, className)}
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Navigation, Pagination]}
      navigation={{ nextEl: `.${s.arrow_right}`, prevEl: `.${s.arrow_left}` }}
      {...swiperProps}
    >
      {React.Children.map(children, (child, i) => (
        <SwiperSlide key={i} className={clsx(s.custom_slide, classNameSlide)}>
          {child}
        </SwiperSlide>
      ))}

      {children && React.Children.count(children) > 1 && navigation ? (
        <>
          <button className={`${s.arrow} ${s.arrow_left}`}>
            <ArrowIosBackIcon />
          </button>
          <button className={`${s.arrow} ${s.arrow_right}`}>
            <ArrowIosForwardIcon />
          </button>
        </>
      ) : null}
    </Swiper>
  )
}
