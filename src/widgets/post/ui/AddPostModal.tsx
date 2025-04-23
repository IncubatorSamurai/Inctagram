'use client'
import {
  AddFilters,
  CloseCreationPostModal,
  Cropping,
  Publication,
  UploadImages,
} from '@/features/post'
import { ArrowIosBackIcon } from '@/shared/assets/icons/ArrowIosBackIcon'
import { useAppDispatch } from '@/shared/hooks'
import { removeFiles, selectFiles } from '@/shared/store/postSlice/postSlice'
import { Button } from '@/shared/ui/button'
import { DialogTitle, Modal } from '@/shared/ui/modal'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import s from './AddPostModule.module.scss'

enum Steps {
  AddPhoto = 0,
  Cropping = 1,
  Filters = 2,
  Publication = 3,
}

type Props = {
  open: boolean
  onChange: (open: boolean) => void
}

export const AddPostModal = ({ open, onChange }: Props) => {
  const t = useTranslations('post')
  const files = useSelector(selectFiles)
  const [isCloseCreationPostModal, setIsCloseCreationPostModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(Steps.AddPhoto)

  const dispatch = useAppDispatch()

  const handleCloseAllModals = () => {
    setIsCloseCreationPostModal(false)
    onChange(false)
    dispatch(removeFiles())
  }

  const handleCloseCreatePostModal = (open: boolean) => {
    if (!open) {
      if (files.length) {
        setIsCloseCreationPostModal(true)
      } else {
        onChange(false)
      }
    }
  }

  const getStepTitle = (currentStep: Steps) => {
    switch (currentStep) {
      case Steps.Cropping:
        return t('cropping')
      case Steps.Filters:
        return t('filters')
      default:
        return t('addPhoto')
    }
  }

  const isShowHeader = !!files.length && currentStep !== Steps.Publication
  const isShowPrevButton = currentStep !== Steps.AddPhoto

  return (
    <>
      <Modal
        className={s.modal}
        open={open}
        onOpenChange={handleCloseCreatePostModal}
        title={!files.length ? getStepTitle(currentStep) : undefined}
      >
        {isShowHeader && (
          <div className={s.header}>
            {isShowPrevButton && (
              <Button variant={'icon'} onClick={() => setCurrentStep(prev => prev - 1)}>
                <ArrowIosBackIcon />
              </Button>
            )}
            <DialogTitle className={s.DialogTitle}>
              <Typography variant="h1">{getStepTitle(currentStep)}</Typography>
            </DialogTitle>
            <Button variant="text" onClick={() => setCurrentStep(prev => prev + 1)}>
              {t('next')}
            </Button>
          </div>
        )}
        {currentStep === Steps.AddPhoto && <UploadImages />}
        {currentStep === Steps.Cropping && <Cropping />}
        {currentStep === Steps.Filters && <AddFilters />}
        {currentStep === Steps.Publication && (
          <Publication
            closeAllModals={handleCloseAllModals}
            setCurrentStep={() => setCurrentStep(prev => prev - 1)}
          />
        )}
      </Modal>

      <CloseCreationPostModal
        open={isCloseCreationPostModal}
        onChange={setIsCloseCreationPostModal}
        onClose={handleCloseAllModals}
      />
    </>
  )
}
