'use client'
import { Modal } from '@/shared/ui/modal'
import { Button } from '@/shared/ui/button/Button'
import s from './AddPostModule.module.scss'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { AddImages } from '@/features/post/UploadImages'
import { Filters } from '@/features/post/Filters'
import { ImageCanvas } from '@/features/post/ImageCanvas'

type Props = {
  open: boolean
  onChange: (open: boolean) => void
}

export const AddPostModal = ({ open, onChange }: Props) => {
  const [image, setImage] = useState<fabric.Image | null>(null)
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)

  const [isChoosen, setIsChoosen] = useState(false)

  const tModal = useTranslations('addModal')

  return (
    <Modal
      title={tModal('addPhoto')}
      className={s.modal}
      open={open}
      onOpenChange={onChange}
      aria-describedby="modalDescription"
    >
      {isChoosen ? (
        <>
          {/* <ImageCanvas setImage={e => setImage(e)} getFabricCanvas={e => setFabricCanvas(e)} /> */}
          {/* <Filters image={image} fabricCanvas={fabricCanvas} /> */}
        </>
      ) : (
        <>
          <AddImages />
          <Button onClick={() => setIsChoosen(true)}>next</Button>
        </>
      )}
    </Modal>
  )
}
