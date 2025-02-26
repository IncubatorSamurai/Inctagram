import { DialogClose, Modal } from '@/shared/ui/modal'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button/Button'
import s from './ForgotPasswordModal.module.scss'

type ForgotPasswordModalProps = {
  email: string
  trigger: React.ReactNode
}

export const ForgotPasswordModal = ({ trigger, email }: ForgotPasswordModalProps) => {
  return (
    <Modal title="Email sent" className={s.forgotPasswordModal} trigger={trigger}>
      <div className={s.forgotPasswordModalContainer}>
        <Typography variant="regular_text_14">
          We have sent a link to confirm your email to {email}
        </Typography>
        <div className={s.forgotPasswordModalBtn}>
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
