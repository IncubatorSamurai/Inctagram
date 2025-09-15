import { DialogClose, Modal } from '@/shared/ui/modal'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import s from './DeleteAvatarModal.module.scss'
type DeleteAvatarModalProps = {
  trigger: React.ReactNode
  onDeleteAvatar?: () => void
  title: string
}
export const DeleteAvatarModal = ({ title, onDeleteAvatar, trigger }: DeleteAvatarModalProps) => {
  return (
    <Modal trigger={trigger} title={title} className={s.delete_avatar_modal}>
      <div className={s.delete_avatar_modal_content}>
        <Typography variant={'regular_text_16'}>
          Are you sure you want to delete the photo?
        </Typography>
        <div className={s.delete_controls}>
          <Button variant={'outline'} onClick={onDeleteAvatar}>
            Yes
          </Button>
          <DialogClose asChild={true}>
            <Button variant={'primary'}>No</Button>
          </DialogClose>
        </div>
      </div>
    </Modal>
  )
}
