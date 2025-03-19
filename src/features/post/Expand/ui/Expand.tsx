import { Typography } from '@/shared/ui/typography'
import s from './Expand.module.scss'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import { CropIcon1x1 } from '@/shared/assets/icons/CropIcon1x1'
import { CropIcon16x9 } from '@/shared/assets/icons/CropIcon16x9'
import { CropIcon4x5 } from '@/shared/assets/icons/CropIcon4x5'

export const Expand = () => {
  return (
    <div>
      <div className={s.row}>
        <Typography variant="h3">Оригинал</Typography> <ImageOutlineIcon />
      </div>{' '}
      <div className={s.row}>
        <Typography variant="h3">1:1</Typography> <CropIcon1x1 />
      </div>{' '}
      <div className={s.row}>
        <Typography variant="h3">4:5</Typography> <CropIcon4x5 />
      </div>{' '}
      <div className={s.row}>
        <Typography variant="h3">16:9</Typography> <CropIcon16x9 />
      </div>
    </div>
  )
}
