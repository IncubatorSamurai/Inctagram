'use client'
import { CloseOutlineIcon } from '@/shared/assets/icons/CloseOutlineIcon'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import { useAppDispatch } from '@/shared/hooks'
import { addFile, removeFile, selectFiles } from '@/shared/store/postSlice/postSlice'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography'
import { nanoid } from '@reduxjs/toolkit'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import s from './UploadImages.module.scss'
import { convertToBytes } from '@/shared/utils'
import { CustomSlider } from '@/shared/ui/customSlider/CustomSlider'
import { toast } from 'react-toastify'

const MAX_FILES = 10
const MAX_FILE_SIZE_MB = 20

export const UploadImages = () => {
  const t = useTranslations('post')
  const files = useSelector(selectFiles)
  const dispatch = useAppDispatch()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files

    if (!inputFiles) {
      return
    }

    const fileArray = Array.from(inputFiles)

    if (files.length + fileArray.length > MAX_FILES) {
      toast.error('You cannot upload more then 10 files')
      return
    }

    const validFiles = fileArray.filter(file => {
      if (file.size > convertToBytes(MAX_FILE_SIZE_MB)) {
        toast.error('File size must be less than 20 MB!')
        return false
      }
      return true
    })

    if (validFiles.length > 0) {
      validFiles.forEach(file =>
        dispatch(addFile({ fileUrl: URL.createObjectURL(file), id: nanoid(), type: file.type }))
      )
    }
  }

  const isDisabledSelectButton = files.length === MAX_FILES

  return (
    <div className={s.container}>
      <div>
        {!!files.length && (
          <Typography variant="small_text" className={s.imagesCounter}>
            {files.length} / {MAX_FILES} {t('photos')}
          </Typography>
        )}
        <div className={s.post_preview}>
          {files.length > 0 ? (
            <div className={s.sliderContainer}>
              <CustomSlider className={s.addPostSlider} navigation={false}>
                {files.map(({ fileUrl, id }) => (
                  <div key={id} className={s.imageWrapper}>
                    <Image
                      src={fileUrl}
                      alt={'photo'}
                      width={220}
                      height={228}
                      className={s.image}
                    />
                    <Button
                      variant="icon"
                      className={s.closeButton}
                      onClick={() => dispatch(removeFile({ id }))}
                    >
                      <CloseOutlineIcon className={s.closeIcon} />
                    </Button>
                  </div>
                ))}
              </CustomSlider>
            </div>
          ) : (
            <ImageOutlineIcon />
          )}
        </div>
      </div>

      <div className={s.controls}>
        <Button variant="primary" fullWidth className={s.button} disabled={isDisabledSelectButton}>
          <label htmlFor="file-upload">{t('selectFromComputer')}</label>
        </Button>
        <input
          id="file-upload"
          type="file"
          accept="image/jpeg, image/png"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <Button variant="outline" fullWidth className={s.button}>
          {t('openDraft')}
        </Button>
      </div>
    </div>
  )
}
