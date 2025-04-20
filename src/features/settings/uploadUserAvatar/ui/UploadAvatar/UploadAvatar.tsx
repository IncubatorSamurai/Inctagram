'use client'
import { Button } from '@/shared/ui/button/Button'
import s from './UploadAvatar.module.scss'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { addFile, removeFile, selectFiles } from '@/shared/store/postSlice/postSlice'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import Cropper from 'react-easy-crop'
import { useAppDispatch } from '@/shared/hooks'
import { useState } from 'react'
import { clsx } from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import { useUploadUserAvatarMutation } from '@/shared/api/profile/profileApi'
import { Alert } from '@/shared/ui/alert'
import { useAvatarCrop } from '@/shared/hooks/useAvatarCrop'

type UpdateAvatarProps = {
  onOpenChange: (open: boolean) => void
}
const MAX_FILE_SIZE_MB = 10
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

export const UploadAvatar = ({ onOpenChange }: UpdateAvatarProps) => {
  const t = useTranslations('post')
  const dispatch = useAppDispatch()

  const [error, setError] = useState('')
  const files = useSelector(selectFiles)
  const [uploadUserAvatar, { isLoading }] = useUploadUserAvatarMutation()
  const [isUploaded, setIsUploaded] = useState(false)

  const { crop, setCrop, zoom, setZoom, onCropComplete, getCroppedImage } = useAvatarCrop()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      setError(`Error! Photo size must be less than 10 MB!`)
    } else {
      setError('')
    }

    if (files.length > 0) {
      dispatch(removeFile({ id: files[0].id }))
    }

    dispatch(addFile({ fileUrl: URL.createObjectURL(file), id: uuidv4(), type: file.type }))
    setIsUploaded(true)
  }

  const handleRemoveFile = () => {
    if (files.length > 0) {
      dispatch(removeFile({ id: files[0].id }))
      setIsUploaded(false)
    }
  }

  const onSave = async () => {
    if (!files.length) return

    const fileUrl = files[0].fileUrl
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
      handleRemoveFile()
      setIsUploaded(false)
      onOpenChange(false)
    } catch (error) {
      console.error('Ошибка при загрузке аватара:', error)
    }
  }

  return (
    <div className={clsx(s.container, isUploaded && !error && s.container_uploaded)}>
      {error && (
        <Alert variant={'error'} fullWidth>
          {error}
        </Alert>
      )}
      <div className={s.post_preview}>
        {files.length > 0 ? (
          <div className={s.imageWrapper}>
            <Cropper
              image={files[0].fileUrl}
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
          disabled={!files.length || isLoading}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
