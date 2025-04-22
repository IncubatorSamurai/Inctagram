'use client'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './CustomSlider.module.scss'
import clsx from 'clsx'
import { ReactElement, useState } from 'react'
import { ArrowIosForwardIcon } from '@/shared/assets/icons/ArrowIosForwardIcon'
import { ArrowIosBackIcon } from '@/shared/assets/icons/ArrowIosBackIcon'

type ArrowProps = {
  classNameArrow?: string
  onClick?: () => void
}

type SliderSettingsProps = {
  totalSlides: number
  sliderClass?: string
  arrowsClass?: string
  dotsClass?: string
}

const PrevArrow = ({ classNameArrow, onClick }: ArrowProps) => (
  <button className={classNameArrow} onClick={onClick}>
    <ArrowIosBackIcon />
  </button>
)

const NextArrow = ({ classNameArrow, onClick }: ArrowProps) => (
  <button className={classNameArrow} onClick={onClick}>
    <ArrowIosForwardIcon />
  </button>
)

export const useSliderSettings = ({
  totalSlides,
  sliderClass,
  arrowsClass,
  dotsClass,
}: SliderSettingsProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  // Функция для обработки кликов по точкам
  const handleDotClick = (index: number) => {
    setActiveIndex(index) // Обновляем активный индекс
  }

  return {
    settings: {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (_: number, next: number) => setActiveIndex(next),
      prevArrow: <PrevArrow classNameArrow={clsx(s.prev_arrow, arrowsClass)} />,
      nextArrow: <NextArrow classNameArrow={clsx(s.next_arrow, arrowsClass)} />,
      className: clsx(s.custom_slider, sliderClass),
      appendDots: (): ReactElement => {
        const totalDots = Math.min(5, totalSlides)
        const startIndex = Math.max(0, Math.min(activeIndex - 2, totalSlides - 5))
        const visibleDots = Array.from({ length: totalDots }, (_, i) => startIndex + i)

        return (
          <div className={clsx(s.dots_list, dotsClass)}>
            <ul className={s.dots}>
              {visibleDots.map(index => (
                <li
                  key={index}
                  className={clsx(s.dots_item, dotsClass, { [s.active]: index === activeIndex })}
                  onClick={() => handleDotClick(index)}
                ></li>
              ))}
            </ul>
          </div>
        )
      },
      customPaging: (): ReactElement => <div className={clsx(s.dots_item, dotsClass)}></div>,
    },
  }
}
