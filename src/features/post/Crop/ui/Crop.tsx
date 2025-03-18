import { allUploadedFiles, selectUploadedFiles } from '@/shared/store/postSlice/postSlice'
import { useRef, useState, useEffect } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { useSelector } from 'react-redux'
import s from './Crop.module.scss'
import Slider from 'react-slick'
import { useAppDispatch } from '@/shared/hooks'
import { slickSettings } from '../lib/slickSettings'
import { createBlobArray } from '../lib/createBlobArray'

export const Crop = () => {
  const uploadedFiles = useSelector(selectUploadedFiles)

  // Сохраняем состояние обрезки для каждого изображения
  const [cropStates, setCropStates] = useState<{
    [key: number]: { crop: { x: number; y: number }; zoom: number }
  }>({})

  const [croppedImages, setCroppedImages] = useState<string[]>([])
  const [slideIndex, setSlideIndex] = useState(0)
  const sliderRef = useRef<Slider | null>(null)
  const dispatch = useAppDispatch()

  const settings = {
    ...slickSettings,
    beforeChange: (current: number, next: number) => setSlideIndex(next),
  }

  // Инициализация состояния crop для всех слайдов
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const newCropsState = uploadedFiles.reduce(
        (acc, _, index) => {
          acc[index] = { crop: { x: 0, y: 0 }, zoom: 1 }
          return acc
        },
        {} as { [key: number]: { crop: { x: number; y: number }; zoom: number } }
      )
      setCropStates(newCropsState)
    }
  }, [uploadedFiles])

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const img = new Image()
    img.src = uploadedFiles[slideIndex]

    img.onload = () => {
      const { x, y, width, height } = croppedAreaPixels

      canvas.width = width
      canvas.height = height

      ctx.drawImage(img, x, y, width, height, 0, 0, width, height)

      const croppedImageDataURL = canvas.toDataURL('image/png')
      setCroppedImages(prev => {
        const newCroppedImages = [...prev]
        newCroppedImages[slideIndex] = croppedImageDataURL
        return newCroppedImages
      })
    }
  }

  const handleCropChange = (newCrop: { x: number; y: number }) => {
    setCropStates(prevStates => ({
      ...prevStates,
      [slideIndex]: { ...prevStates[slideIndex], crop: newCrop },
    }))
  }

  const handleZoomChange = (newZoom: number) => {
    setCropStates(prevStates => ({
      ...prevStates,
      [slideIndex]: { ...prevStates[slideIndex], zoom: newZoom },
    }))
  }

  const save = () => {
    // Если изображение было обрезано, используем его обрезанный вариант
    const updatedImages = uploadedFiles.map((fileUrl, index) => {
      return croppedImages[index] || fileUrl // Используем обрезанное изображение, если оно есть
    })
    console.log(updatedImages)
    const blobArray = createBlobArray(updatedImages)

    // Диспатчим все изображения (включая те, которые не были обрезаны)
    dispatch(allUploadedFiles(blobArray))
  }

  return (
    <div className={s.container}>
      <Slider ref={sliderRef} {...settings}>
        {uploadedFiles?.map((fileUrl, index) => {
          const cropState = cropStates[index] || { crop: { x: 0, y: 0 }, zoom: 1 }

          return (
            <div key={index} className={s.slick_slide}>
              <Cropper
                image={fileUrl}
                crop={cropState.crop}
                zoom={cropState.zoom}
                aspect={3 / 3}
                onCropChange={handleCropChange}
                onCropComplete={onCropComplete}
                onZoomChange={handleZoomChange}
                style={{
                  containerStyle: {
                    position: 'relative',
                    background: 'transparent',
                    objectFit: 'cover',
                    width: '100%',
                    maxWidth: '490px',
                    height: '503px',
                    boxShadow: 'none',
                  },
                }}
              />
            </div>
          )
        })}
      </Slider>

      <button onClick={save}>Save Cropped Images</button>
    </div>
  )
}
