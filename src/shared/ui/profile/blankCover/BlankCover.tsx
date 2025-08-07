import { clsx } from 'clsx'
import { ImageOutline } from '@/shared/assets/icons/ImageOutline'
import s from './BlankCover.module.scss'
import React from 'react'

type Props = {
  size?: string
  className?: string
  classNameSvg?: string
  type?: 'circle' | 'square'
}

export const BlankCover = ({ className, classNameSvg, type = 'circle', size }: Props) => {
  const classNameStyle = clsx(s[type], className)

  return (
    <div className={classNameStyle} style={{ '--size': size } as React.CSSProperties}>
      <ImageOutline height={36} width={36} className={classNameSvg} />
    </div>
  )
}
