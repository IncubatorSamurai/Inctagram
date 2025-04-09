import { ImageIcon } from '@/shared/assets/icons/ImageIcon'
import s from './UploadUserAvatar.module.scss'
import { Button } from '@/shared/ui/button'

export const UploadUserAvatar = () => {
  return (
    <div className={s.container}>
      <div className={s.avatar}>
        <ImageIcon width={48} height={48} />
      </div>
      <Button variant="outline"> Add a Profile Photo</Button>
    </div>
  )
}
