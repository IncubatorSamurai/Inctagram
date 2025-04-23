'use client'
import { Button } from '@/shared/ui/button/Button'
import s from './UploadAvatar.module.scss'
import { useTranslations } from 'next-intl'
import { addAvatar, removeAvatar, selectAvatar } from '@/shared/store/postSlice/postSlice'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import Cropper from 'react-easy-crop'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useRef, useState } from 'react'
import { clsx } from 'clsx'
import { useUploadUserAvatarMutation } from '@/shared/api/profile/profileApi'
import { useAvatarCrop } from '@/shared/hooks/useAvatarCrop'
import { nanoid } from '@reduxjs/toolkit'
import { convertToBytes } from '@/shared/utils'
import { toast } from 'react-toastify'

type UpdateAvatarProps = {
  onOpenChange: (open: boolean) => void
}
const MAX_FILE_SIZE_MB = 10
const MAX_FILE_SIZE = convertToBytes(MAX_FILE_SIZE_MB)



export const UploadAvatar = ({ onOpenChange }: UpdateAvatarProps) => {
  const t = useTranslations('post')
  const dispatch = useAppDispatch()

  const [error, setError] = useState('')
  const avatar = useAppSelector(selectAvatar)
  const [uploadUserAvatar, { isLoading }] = useUploadUserAvatarMutation()
  const [isUploaded, setIsUploaded] = useState(false)
  const { crop, setCrop, zoom, setZoom, onCropComplete, getCroppedImage } = useAvatarCrop()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }


  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`Error! Photo size must be less than 10 MB!`)
      setError(`Error! Photo size must be less than 10 MB!`)
resetFileInput()
    } else {
      setError('')
    }

    if (avatar) {
      dispatch(removeAvatar())
    }
    if (file.size <= MAX_FILE_SIZE) {
      dispatch(addAvatar({ fileUrl: URL.createObjectURL(file), id: nanoid(), type: file.type }))
      setIsUploaded(true)
    }
  }

  const handleRemoveAvatar = () => {
    if (avatar) {
      dispatch(removeAvatar())
      setIsUploaded(false)
    }
  }

  const onSave = async () => {
    if (!avatar) return

    const fileUrl = avatar.fileUrl
    const blob = await getCroppedImage(fileUrl)

    if (!blob) {
      console.error('Не удалось получить обрезанное изображение')
      return
    }

    const file = new File([blob], 'avatar.png', { type: 'image/png' })

    const formData = new FormData()
    formData.append('file', file)

    try {
      const result = await uploadUserAvatar(formData).unwrap()
      console.log('Аватар загружен успешно', result)
      handleRemoveAvatar()
      setIsUploaded(false)
      onOpenChange(false)
    } catch (error) {
      toast.error('Ошибка при загрузке аватара:', error || '')
    }
  }
  console.log('File in ref after reset:', fileInputRef.current?.files?.[0])
  return (
    <div className={clsx(s.container, isUploaded && !error && s.container_uploaded)}>
      <div className={s.post_preview}>
        {avatar.id && !error ? (
          <div className={s.imageWrapper}>
            <Cropper
              image={avatar.fileUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              objectFit={'cover'}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        ) : (
          <ImageOutlineIcon />
        )}
      </div>

      <div className={clsx(s.controls, isUploaded && !error && s.controls_uploaded)}>
        <Button variant="primary" fullWidth className={s.button_selected}>
          <label htmlFor="file-upload">{t('selectFromComputer')}</label>
        </Button>
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          multiple={false}
          accept="image/jpeg, image/png"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <Button
          variant="primary"
          className={clsx(s.button, s.button_save)}
          onClick={onSave}
          disabled={!avatar || isLoading}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
