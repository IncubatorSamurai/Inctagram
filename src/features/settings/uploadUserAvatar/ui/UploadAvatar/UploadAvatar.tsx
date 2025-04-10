'use client'
import { Button } from '@/shared/ui/button/Button'
import s from './UploadAvatar.module.scss'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { addFile, removeFile, selectFiles } from '@/shared/store/postSlice/postSlice'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import Image from 'next/image'
import { useAppDispatch } from '@/shared/hooks'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import { clsx } from 'clsx'
import { useUploadUserAvatarMutation } from '@/shared/api/profile/profileApi'


const MAX_FILE_SIZE_MB = 20
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

export const UploadAvatar = () => {
  const [isUploaded, setIsUploaded] = useState(false)
  const t = useTranslations('post')
  const files = useSelector(selectFiles)
  const dispatch = useAppDispatch()
  const [uploadUserAvatar, { isLoading }] = useUploadUserAvatarMutation()
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files

    if (inputFiles) {
      const fileArray = Array.from(inputFiles)

      // Проверяем, если уже есть файлы, заменяем их (всего один файл)
      const validFiles = fileArray.filter(file => {
        if (file.size > MAX_FILE_SIZE) {
          console.error(`Файл ${file.name} превышает ${MAX_FILE_SIZE_MB} MB`)
          return false
        }
        return true
      })

      if (validFiles.length > 0) {
        // Удаляем старый файл перед добавлением нового
        dispatch(removeFile({ id: files[0]?.id }))
        const file = validFiles[0]
        setIsUploaded(true)
        dispatch(addFile({ fileUrl: URL.createObjectURL(file), id: uuidv4(), type: file.type }))
      }
    }
  }

  const isDisabledSelectButton = !!files.length
  const onSave = async () => {
    if (!files.length) return

    const fileUrl = files[0].fileUrl

    // Получить сам файл по URL (временный blob), если Вы не сохраняете File отдельно
    const response = await fetch(fileUrl)
    const blob = await response.blob()

    const file = new File([blob], 'avatar.png', { type: blob.type }) // можно изменить имя файла

    const formData = new FormData()
    formData.append('file', file)

    try {
      const result = await uploadUserAvatar(formData).unwrap()
      console.log('Аватар загружен успешно', result)
      // Можно тут вызвать какой-нибудь toast или обновить профиль
    } catch (error) {
      console.error('Ошибка при загрузке аватара:', error)
      // Обработать ошибку
    }
  }
  return (
    <div className={clsx(s.container, isUploaded && s.container_uploaded)}>
      <div>
        {/*{!!files.length && (*/}
        {/*  <Typography variant="small_text" className={s.imagesCounter}>*/}
        {/*    {"Удалить это фото"}*/}
        {/*  </Typography>*/}
        {/*)}*/}
        <div className={s.post_preview}>
          {files.length > 0 ? (
            <div className={s.imageWrapper}>
              <Image
                src={files[0].fileUrl}
                alt="uploaded photo"
                fill
                className={s.image}
              />
              {/*<Button*/}
              {/*  variant="icon"*/}
              {/*  className={s.closeButton}*/}
              {/*  onClick={() => dispatch(removeFile({ id: files[0].id }))}*/}
              {/*>*/} {/*  <CloseOutlineIcon className={s.closeIcon} />*/}
              {/*</Button>
             */}
            </div>
          ) : (
            <ImageOutlineIcon />
          )}
        </div>
      </div>

      <div className={clsx(s.controls, isUploaded && s.controls_uploaded)}>
        <Button variant="primary" fullWidth className={clsx(s.button_selected)} disabled={isDisabledSelectButton}>
          <label htmlFor="file-upload">{t('selectFromComputer')}</label>
        </Button>
        <input
          id="file-upload"
          type="file"
          accept="image/jpeg, image/png"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <Button variant="primary"  className={clsx(s.button, s.button_save)}  onClick={onSave}>
         Save
        </Button>
      </div>
    </div>
  )
}
