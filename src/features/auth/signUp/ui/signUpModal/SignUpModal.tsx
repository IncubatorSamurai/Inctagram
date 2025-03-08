import { Button } from '@/shared/ui/button'
import { DialogClose, Modal } from '@/shared/ui/modal'
import { Typography } from '@/shared/ui/typography'
import s from './SignUpModal.module.scss'

type SignUpModalProps = {
  email: string
  open: boolean
  onChange: () => void
}

export const SignUpModal = ({  email, open, onChange }: SignUpModalProps) => {

  return (
    <Modal title="Email sent" open={open} onOpenChange={onChange}>
      <div className={s.SignUpModalContainer}>
        <Typography variant="regular_text_14">{email}</Typography>
        <div className={s.SignUpModalBtn}>
          <DialogClose asChild>
            <Button variant="primary" fullWidth={true}>
              OK
            </Button>
          </DialogClose>
        </div>
      </div>
    </Modal>
  )
}
