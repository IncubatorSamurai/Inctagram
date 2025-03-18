'use client'
import { Modal } from '@/shared/ui/modal'
import { Button } from '@/shared/ui/button/Button'
import s from './AddPostModule.module.scss'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { AddImages } from '@/features/post/UploadImages'
import { Filters } from '@/features/post/Filters'
import { ImageCanvas } from '@/features/post/ImageCanvas'
import * as fabric from 'fabric'
import { Crop } from '@/features/post/Crop'
import { useAppDispatch } from '@/shared/hooks'
import { nextStep, prevStep, selectStep } from '@/shared/store/postSlice/postSlice'
import { useSelector } from 'react-redux'

type Props = {
  open: boolean
  onChange: (open: boolean) => void
}

export const AddPostModal = ({ open, onChange }: Props) => {
  const [image, setImage] = useState<fabric.FabricImage | null>(null)
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)
  const dispatch = useAppDispatch()

  const [isChoosen, setIsChoosen] = useState(false)
  const step = useSelector(selectStep)
  console.log(step)
  const tModal = useTranslations('addModal')

  return (
    <Modal
      title={tModal('addPhoto')}
      className={s.modal}
      open={open}
      onOpenChange={onChange}
      aria-describedby="modalDescription"
    >
      {step === 0 && (
        <>
          <AddImages />
          <Button onClick={() => dispatch(nextStep())}>next</Button>{' '}
          <Button onClick={() => dispatch(prevStep())}>prev</Button>
        </>
      )}
      {step === 1 && <Crop />}
      {step === 2 && (
        <>
          <ImageCanvas setImage={e => setImage(e)} getFabricCanvas={e => setFabricCanvas(e)} />
          <Filters image={image} fabricCanvas={fabricCanvas} />
        </>
      )}
    </Modal>
  )
}
