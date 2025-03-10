import { DialogClose, Modal } from '@/shared/ui/modal'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button/Button'
import s from './ForgotPasswordModal.module.scss'

type ForgotPasswordModalProps = {
  email: string

  open: boolean
  onChange: (open: boolean) => void
}

export const ForgotPasswordModal = ({ email, open, onChange }: ForgotPasswordModalProps) => {
  return (
    <Modal
      title="Email sent"
      className={s.forgotPasswordModal}
      open={open}
      onOpenChange={onChange}
      aria-describedby="forgot-password-modal-description"
    >
      <div className={s.forgotPasswordModalContainer}>
        <Typography variant="regular_text_14" id="forgot-password-modal-description">
          We have sent a link to confirm your email to {email}
        </Typography>
        <div className={s.forgotPasswordModalBtn}>
          <DialogClose asChild>
            <Button variant="primary" fullWidth>
              OK
            </Button>
          </DialogClose>
        </div>
      </div>
    </Modal>
  )
}
