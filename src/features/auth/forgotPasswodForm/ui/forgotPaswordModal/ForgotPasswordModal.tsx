import { Modal } from '@/shared/ui/modal'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button/Button'
import s from './ForgotPasswordModal.module.scss'
type ForgotPasswordModalProps = {
  open: boolean
  onClose: () => void
  email: string
}

export const ForgotPasswordModal = ({ open, onClose, email }: ForgotPasswordModalProps) => {
  return (
    <Modal title="Email sent" open={open} onOpenChange={onClose} className={s.forgotPasswordModal}>
      <div className={s.forgotPasswordModalContainer}>
        <Typography variant="regular_text_14">
          We have sent a link to confirm your email to {email}
        </Typography>
        <div className={s.forgotPasswordModalBtn}>
          <Button variant="primary" onClick={onClose} fullWidth={true}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  )
}
