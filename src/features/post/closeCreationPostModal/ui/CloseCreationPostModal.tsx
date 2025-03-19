import { DialogClose, Modal } from '@/shared/ui/modal'
import s from './CloseCreationPostModal.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { useTranslations } from 'next-intl'

type Props = {
  open: boolean
  onChange: (open: boolean) => void
}

export const CloseCreationPostModal = ({ open, onChange }: Props) => {
  const t = useTranslations('post')

  return (
    <Modal
      title={t('close')}
      className={s.modal}
      open={open}
      onOpenChange={onChange}
      aria-describedby="modalDescription"
    >
      <div className={s.container}>
        <Typography variant="regular_text_16">{t('closeCreationPostModalDescription1')}</Typography>
        <Typography variant="regular_text_16">{t('closeCreationPostModalDescription2')}</Typography>

        <DialogClose asChild>
          <div className={s.buttonsContainer}>
            <Button variant="outline" className={s.button}>
              {t('discard')}
            </Button>
            <Button variant="primary" className={s.button}>
              {t('saveDraft')}
            </Button>
          </div>
        </DialogClose>
      </div>
    </Modal>
  )
}
