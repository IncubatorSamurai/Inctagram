import { DialogClose, Modal } from '@/shared/ui/modal'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button/Button'
import s from './EmailSentModal.module.scss'

type Props = {
  email: string
  open: boolean
  onChange: (open: boolean) => void
}

export const EmailSentModal = ({ email, open, onChange }: Props) => {
  return (
    <Modal
      title="Email sent"
      className={s.modal}
      open={open}
      onOpenChange={onChange}
      aria-describedby="modalDescription"
    >
      <div className={s.container}>
        <Typography variant="regular_text_16" id="modalDescription">
          We have sent a link to confirm your email to {email}
        </Typography>
        <DialogClose asChild>
          <Button variant="primary" fullWidth className={s.button}>
            OK
          </Button>
        </DialogClose>
      </div>
    </Modal>
  )
}
