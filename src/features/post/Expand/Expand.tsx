import { Typography } from '@/shared/ui/typography'

import { CropIcon1x1 } from '@/shared/assets/icons/CropIcon1x1'
import { CropIcon16x9 } from '@/shared/assets/icons/CropIcon16x9'
import { CropIcon4x5 } from '@/shared/assets/icons/CropIcon4x5'
import { Button } from '@/shared/ui/button'
import { useState } from 'react'
import { ExpandIcon } from '@/shared/assets/icons/ExpandIcon'
import s from './Expand.module.scss'
import clsx from 'clsx'

type AspectProps = { a: number; b: number }

type Props = {
  getAspect: (aspect: AspectProps) => void
}
export const Expand = ({ getAspect }: Props) => {
  const [isVisible, setIsVisible] = useState(false)

  const chooseExpand = (aspect: AspectProps) => {
    getAspect(aspect)
  }

  return (
    <div className={clsx(s.wrapper, isVisible && s.isVisible)}>
      <Button variant="icon" className={s.expand} onClick={() => setIsVisible(!isVisible)}>
        <ExpandIcon color={isVisible ? 'var(--color-accent-500)' : ''} />
      </Button>
      {isVisible && (
        <div className={s.container}>
          <Button variant="text" className={s.row} onClick={() => chooseExpand({ a: 1, b: 1 })}>
            <Typography variant="h3">1:1</Typography> <CropIcon1x1 />
          </Button>
          <Button variant="text" className={s.row} onClick={() => chooseExpand({ a: 4, b: 5 })}>
            <Typography variant="h3">4:5</Typography> <CropIcon4x5 />
          </Button>
          <Button variant="text" className={s.row} onClick={() => chooseExpand({ a: 16, b: 9 })}>
            <Typography variant="h3">16:9</Typography> <CropIcon16x9 />
          </Button>
        </div>
      )}
    </div>
  )
}
