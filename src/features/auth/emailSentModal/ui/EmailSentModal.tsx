import { DialogClose, Modal } from '@/shared/ui/modal'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button/Button'
import s from './EmailSentModal.module.scss'
import { useTranslations } from 'next-intl'

type Props = {
  email: string
  open: boolean
  onChange: (open: boolean) => void
}

export const EmailSentModal = ({ email, open, onChange }: Props) => {
  const tAuth = useTranslations('auth')

  return (
    <Modal
      title={tAuth('emailSent')}
      className={s.modal}
      open={open}
      onOpenChange={onChange}
      aria-describedby="modalDescription"
    >
      <div className={s.container}>
        <Typography variant="regular_text_16" id="modalDescription">
          {tAuth('sentConfirmLink')} {email}
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
