'use client'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './CustomSlider.module.scss'
import clsx from 'clsx'
import { ArrowIosForwardIcon } from '@/shared/assets/icons/ArrowIosForwardIcon'
import { ArrowIosBackIcon } from '@/shared/assets/icons/ArrowIosBackIcon'


type ArrowProps = {
  onClick?: () => void
  className?: string
}

// 🔹 Компонент для левой стрелки
const PrevArrow = ({ onClick, className }: ArrowProps) => (
  <button className={clsx(s.prev_arrow, className)} onClick={onClick}>
    <ArrowIosBackIcon />
  </button>
)

// 🔹 Компонент для правой стрелки
const NextArrow = ({ onClick, className }: ArrowProps) => (
  <button className={clsx(s.next_arrow, className)} onClick={onClick}>
    <ArrowIosForwardIcon />
  </button>
)

// 🔹 Функция, возвращающая настройки слайдера с разными классами
export const useSliderSettings = ({
  sliderClass,
  arrowsClassPrev,
                                    arrowsClassNext,
  dotsClass,
}: {
  sliderClass?: string
  arrowsClassPrev?:string
  arrowsClassNext?:string
  dotsClass?: string
}) => ({


  settings: {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow className={clsx(s.custom_arrow, arrowsClassPrev)}  />,
    nextArrow: <NextArrow className= {clsx(s.custom_arrow, arrowsClassNext)}  />,
    className: clsx(s.custom_slider, sliderClass),
    appendDots: (dots: React.ReactNode) => (
      <div className={clsx(s.dots_list, dotsClass)}>
        <ul className={s.dots}>{dots}</ul>
      </div>
    ),
    customPaging: () => <div className={clsx(s.dots_item, dotsClass)}></div>,
  },
})
