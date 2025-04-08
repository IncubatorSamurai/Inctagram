'use client'
import { DialogTitle, Modal } from '@/shared/ui/modal'
import s from './AddPostModule.module.scss'
import { useTranslations } from 'next-intl'
import { nextStep, removeFiles, selectFiles, selectStep } from '@/shared/store/postSlice/postSlice'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/shared/hooks'
import { useEffect, useState } from 'react'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { Steps } from '@/shared/enums/postEnums'
import {
  AddFilters,
  CloseCreationPostModal,
  Cropping,
  Publication,
  SwitchStep,
  UploadImages,
} from '@/features/post'

type Props = {
  open: boolean
  onChange: (open: boolean) => void
}

export const AddPostModal = ({ open, onChange }: Props) => {
  const t = useTranslations('post')
  const step = useSelector(selectStep)
  const files = useSelector(selectFiles)
  const [isCloseCreationPostModal, setIsCloseCreationPostModal] = useState(false)
  const [title, setTitle] = useState('')

  const dispatch = useAppDispatch()

  const handleCloseAllModals = () => {
    setIsCloseCreationPostModal(false)
    onChange(false)
    dispatch(removeFiles())
  }

  const handleCloseCreatePostModal = (open: boolean) => {
    console.log(open)

    if (!open) {
      if (files.length) {
        setIsCloseCreationPostModal(true)
      } else {
        onChange(false)
      }
    }
  }

  useEffect(() => {
    if (step === Steps.Step1) {
      setTitle(t('cropping'))
    } else if (step === Steps.Step2) {
      setTitle(t('filters'))
    } else {
      setTitle(t('addPhoto'))
    }
  }, [step])

  const isShowHeader = !!files.length && step !== Steps.Step3
  const isShowPrevButton = step !== Steps.Step0

  return (
    <>
      <Modal
        className={s.modal}
        open={open}
        onOpenChange={handleCloseCreatePostModal}
        title={!files.length ? title : undefined}
      >
        {isShowHeader && (
          <div className={s.header}>
            {isShowPrevButton && <SwitchStep />}
            <DialogTitle className={s.DialogTitle}>
              <Typography variant="h1">{title}</Typography>
            </DialogTitle>
            <Button variant="text" onClick={() => dispatch(nextStep())}>
              {t('next')}
            </Button>
          </div>
        )}
        {step === Steps.Step0 && <UploadImages />}
        {step === Steps.Step1 && <Cropping />}
        {step === Steps.Step2 && <AddFilters />}
        {step === Steps.Step3 && <Publication closeAllModals={handleCloseAllModals} />}
      </Modal>

      <CloseCreationPostModal
        open={isCloseCreationPostModal}
        onChange={setIsCloseCreationPostModal}
        onClose={handleCloseAllModals}
      />
    </>
  )
}
