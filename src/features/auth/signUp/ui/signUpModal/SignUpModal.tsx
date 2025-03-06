import { Button } from '@/shared/ui/button'
import { DialogClose, Modal } from '@/shared/ui/modal'
import { Typography } from '@/shared/ui/typography'
import s from './SignUpModal.module.scss'

type SignUpModalProps = {
  email: string
  trigger?: React.ReactNode
  open: boolean
  onReset: () => void
  onChange: () => void
  error: boolean
}

export const SignUpModal = ({ error, email, open, onChange, onReset }: SignUpModalProps) => {
  const handler = () => {
    if (error) {
      onChange()
    } else {
      onChange()
      onReset()
    }
  }
  return (
    <Modal title="Email sent" open={open} onOpenChange={handler}>
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
