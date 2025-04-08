'use client'
import { Button } from '@/shared/ui/button/Button'
import s from './UploadImages.module.scss'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { addFile, removeFile, selectFiles } from '@/shared/store/postSlice/postSlice'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import Image from 'next/image'
import { useAppDispatch } from '@/shared/hooks'
import { sliderSettings } from '@/shared/config/sliderSettings'
import { v4 as uuidv4 } from 'uuid'
import { CloseOutlineIcon } from '@/shared/assets/icons/CloseOutlineIcon'
import { Typography } from '@/shared/ui/typography'

const MAX_FILES = 10
const MAX_FILE_SIZE_MB = 20
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

export const UploadImages = () => {
  const t = useTranslations('post')
  const files = useSelector(selectFiles)
  const dispatch = useAppDispatch()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files

    if (inputFiles) {
      const fileArray = Array.from(inputFiles)

      if (files.length + fileArray.length > MAX_FILES) {
        console.error(
          `Вы можете загрузить максимум ${MAX_FILES} фотографий. Сейчас загружено: ${files.length}`
        )
        return
      }

      const validFiles = fileArray.filter(file => {
        if (file.size > MAX_FILE_SIZE) {
          console.error(`Файл ${file.name} превышает ${MAX_FILE_SIZE_MB} MB`)
          return false
        }

        return true
      })

      if (validFiles.length > 0) {
        validFiles.forEach(file =>
          dispatch(addFile({ fileUrl: URL.createObjectURL(file), id: uuidv4(), type: file.type }))
        )
      }
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
            <>
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
            </>
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
