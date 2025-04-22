'use client'
import { CloseOutlineIcon } from '@/shared/assets/icons/CloseOutlineIcon'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import { sliderSettings } from '@/shared/config/sliderSettings'
import { useAppDispatch } from '@/shared/hooks'
import { addFile, removeFile, selectFiles } from '@/shared/store/postSlice/postSlice'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography'
import { nanoid } from '@reduxjs/toolkit'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import s from './UploadImages.module.scss'
import { convertToBytes } from '@/shared/utils'

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
      console.error(
        `${t('errorUploadImages1')} ${MAX_FILES}. ${t('errorUploadImages2')} ${files.length}`
      )
      return
    }

    const validFiles = fileArray.filter(file => {
      if (file.size > convertToBytes(MAX_FILE_SIZE_MB)) {
        console.error(`${t('file')} ${file.name} ${t('exceeds')} ${MAX_FILE_SIZE_MB} MB`)
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
              <Slider {...sliderSettings}>
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
              </Slider>
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
