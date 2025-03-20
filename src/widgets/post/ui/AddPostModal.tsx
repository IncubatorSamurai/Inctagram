'use client'
import { Modal } from '@/shared/ui/modal'
import s from './AddPostModule.module.scss'
import { useTranslations } from 'next-intl'
import { AddImages } from '@/features/post/UploadImages'
import { AddFilters } from '@/features/post/AddFilters'
import { Crop } from '@/features/post/Crop'
import { nextStep, selectStep, selectUploadedFiles } from '@/shared/store/postSlice/postSlice'
import { useSelector } from 'react-redux'
import { SwitchStep } from '@/features/post/SwitchStep'
import { useAppDispatch } from '@/shared/hooks'
import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onChange: (open: boolean) => void
}

export const AddPostModal = ({ open, onChange }: Props) => {
  const tModal = useTranslations('addModal')

  const step = useSelector(selectStep)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (step === 0) {
      setTitle(tModal('addPhoto'))
    } else if (step === 1) {
      setTitle(tModal('crop'))
    } else {
      setTitle(tModal('filter'))
    }
  }, [step])
  const uploadedFiles = useSelector(selectUploadedFiles)

  const isNecessaryClose = uploadedFiles.length > 0
  const isNecessaryChildren = step !== 0

  const dispatch = useAppDispatch()
  return (
    <Modal
      headerChildren={isNecessaryChildren && <SwitchStep />}
      title={title}
      className={s.modal}
      arrow={isNecessaryClose ? () => dispatch(nextStep()) : null}
      open={open}
      onOpenChange={onChange}
      aria-describedby="modalDescription"
    >
      {step === 0 && <AddImages />}
      {step === 1 && <Crop />}
      {step === 2 && <AddFilters />}
    </Modal>
  )
}
