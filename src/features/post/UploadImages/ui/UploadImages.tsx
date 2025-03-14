'use client'
import { Button } from '@/shared/ui/button/Button'
import s from './UploadImages.module.scss'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { addFile, selectUploadedFiles } from '@/shared/store/postSlice/postSlice'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import Image from 'next/image'
import { useAppDispatch } from '@/shared/hooks'
import { MAX_FILE, MAX_SIZE, sliderSettings } from '../consts/consts'

export const AddImages = () => {
  const tModal = useTranslations('addModal')
  const dispatch = useAppDispatch()
  const uploadedFiles = useSelector(selectUploadedFiles)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files)

      // Фильтрация по размеру (до 20 MB) и количеству (не более 10 файлов)
      const validFiles = fileArray.filter(file => file.size <= MAX_SIZE)
      if (validFiles.length > 0 && validFiles.length <= MAX_FILE) {
        validFiles.forEach(file => {
          dispatch(addFile({ fileUrl: URL.createObjectURL(file) }))
        })
      } else {
        console.error('Выберите не более 10 файлов и размер каждого файла не должен превышать 20MB')
      }
    }
  }

  return (
    <div className={s.container}>
      {/* Если загружены файлы, показываем слайдер */}
      <div className={s.post_preview}>
        {uploadedFiles.length > 0 ? (
          <div className={s.sliderContainer}>
            <Slider {...sliderSettings}>
              {uploadedFiles.map((fileUrl, index) => (
                <div key={`slide-${index}`} className={s.slick_slide}>
                  <Image src={fileUrl} alt={'photo'} width={220} height={228} />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <ImageOutlineIcon />
        )}
      </div>

      <div className={s.controls}>
        <Button variant="primary" fullWidth className={s.button} asChild>
          <label htmlFor="file-upload">{tModal('SelectFromComputer')}</label>
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
          {tModal('OpenDraft')}
        </Button>
      </div>
    </div>
  )
}
