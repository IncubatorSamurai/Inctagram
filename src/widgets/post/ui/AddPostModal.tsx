'use client'
import { DialogTitle, Modal } from '@/shared/ui/modal'
import s from './AddPostModule.module.scss'
import { useTranslations } from 'next-intl'
import { UploadImages } from '@/features/post/UploadImages'
import { AddFilters } from '@/features/post/AddFilters'
import { Crop } from '@/features/post/Crop'
import { nextStep, selectStep, selectUploadedFiles } from '@/shared/store/postSlice/postSlice'
import { useSelector } from 'react-redux'
import { SwitchStep } from '@/features/post/SwitchStep'
import { useAppDispatch } from '@/shared/hooks'
import { useEffect, useState } from 'react'
import { Publication } from '@/features/post/publication'
import { CloseCreationPostModal } from '@/features/post/closeCreationPostModal'
import { PATH } from '@/shared/config/routes'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { Cropping } from '@/features/post/cropping/ui/Cropping'

type Props = {
  open: boolean
  onChange: (open: boolean) => void
}

export const AddPostModal = ({ open, onChange }: Props) => {
  const t = useTranslations('post')
  const step = useSelector(selectStep)
  const [title, setTitle] = useState('')
  const [isCloseCreationPostModal, setIsCloseCreationPostModal] = useState(false)

  useEffect(() => {
    if (step === 0) {
      setTitle(t('addPhoto'))
    } else if (step === 1) {
      setTitle(t('cropping'))
    } else if (step === 2) {
      setTitle(t('filters'))
    } else if (step === 3) {
      setTitle(t('publication'))
    }
  }, [step])

  const uploadedFiles = useSelector(selectUploadedFiles)

  const dispatch = useAppDispatch()

  const closeAllModalsHandler = () => {
    setIsCloseCreationPostModal(false)
    onChange(false)
  }

  const onOpenChangeHandler = (open: boolean) => {
    if (!open) {
      if (uploadedFiles.length > 0) {
        setIsCloseCreationPostModal(true)
      } else {
        onChange(false)
      }
    }
  }

  const onClickHeaderHandler = () => {
    if (step < 3) {
      dispatch(nextStep())
    }
    // else {
    //   onChange(false)
    // }
  }

  return (
    <>
      <Modal
        className={s.modal}
        open={open}
        onOpenChange={onOpenChangeHandler}
        title={!uploadedFiles.length ? title : undefined}
      >
        {!!uploadedFiles.length && (
          <div className={s.header}>
            {step > 0 && <SwitchStep />}
            <DialogTitle className={s.DialogTitle}>
              <Typography variant="h1">{title}</Typography>
            </DialogTitle>
            <Button variant="text" onClick={onClickHeaderHandler}>
              {step === 3 ? t('publicationHeader') : t('next')}
            </Button>
          </div>
        )}
        {step === 0 && <UploadImages />}
        {/* {step === 1 && <Crop />} */}
        {step === 1 && <Cropping />}
        {step === 2 && <AddFilters />}
        {step === 3 && <Publication />}
      </Modal>

      <CloseCreationPostModal
        open={isCloseCreationPostModal}
        onChange={setIsCloseCreationPostModal}
        onClose={closeAllModalsHandler}
      />
    </>
  )
}
