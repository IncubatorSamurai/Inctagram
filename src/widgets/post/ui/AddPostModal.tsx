'use client'
import { Modal } from '@/shared/ui/modal'
import s from './AddPostModule.module.scss'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { AddImages } from '@/features/post/UploadImages'
import { Filters } from '@/features/post/Filters'
import { ImageCanvas } from '@/features/post/ImageCanvas'
import * as fabric from 'fabric'
import { Crop } from '@/features/post/Crop'
import { nextStep, selectStep, selectUploadedFiles } from '@/shared/store/postSlice/postSlice'
import { useSelector } from 'react-redux'
import { SwitchStep } from '@/features/post/SwitchStep'
import { useAppDispatch } from '@/shared/hooks'

type Props = {
  open: boolean
  onChange: (open: boolean) => void
}

export const AddPostModal = ({ open, onChange }: Props) => {
  const [image, setImage] = useState<fabric.FabricImage | null>(null)
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)
  const [index, setIndex] = useState(0)

  const step = useSelector(selectStep)

  const uploadedFiles = useSelector(selectUploadedFiles)
  const tModal = useTranslations('addModal')

  const isNecessaryClose = uploadedFiles.length > 0
  const isNecessaryChildren = step !== 0

  const dispatch = useAppDispatch()
  return (
    <Modal
      headerChildren={isNecessaryChildren && <SwitchStep />}
      title={tModal('addPhoto')}
      className={s.modal}
      arrow={isNecessaryClose ? () => dispatch(nextStep()) : null}
      open={open}
      onOpenChange={onChange}
      aria-describedby="modalDescription"
    >
      {step === 0 && (
        <>
          <AddImages />
        </>
      )}
      {step === 1 && <Crop />}
      {step === 2 && (
        <>
          <ImageCanvas />
          {/* <Filters index={index} image={image} fabricCanvas={fabricCanvas} /> */}
        </>
      )}
    </Modal>
  )
}
