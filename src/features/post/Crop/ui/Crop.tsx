import { allUploadedFiles, selectUploadedFiles } from '@/shared/store/postSlice/postSlice'
import { useRef, useState, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import { useSelector } from 'react-redux'
import s from './Crop.module.scss'
import Slider from 'react-slick'
import { useAppDispatch } from '@/shared/hooks'

export const Crop = () => {
  const uploadedFiles = useSelector(selectUploadedFiles)
  const [cropStates, setCropStates] = useState<{
    [key: number]: { crop: { x: number; y: number }; zoom: number }
  }>({})
  const [croppedImages, setCroppedImages] = useState<string[]>([]) // Храним обрезанные изображения для каждого слайда
  const [slideIndex, setSlideIndex] = useState(0)
  const sliderRef = useRef<Slider | null>(null)
  const dispatch = useAppDispatch()

  // Инициализация состояния crop для первого слайда
  useEffect(() => {
    if (uploadedFiles.length > 0 && !cropStates[0]) {
      setCropStates(prevState => ({
        ...prevState,
        [0]: { crop: { x: 0, y: 0 }, zoom: 1 },
      }))
    }
  }, [uploadedFiles, cropStates])

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setSlideIndex(next),
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
    const blobArray: string[] = []

    croppedImages.forEach(imageUrl => {
      if (imageUrl) {
        // Преобразуем Data URL в Blob
        const byteString = atob(imageUrl.split(',')[1]) // Получаем строку данных из Data URL
        const arrayBuffer = new ArrayBuffer(byteString.length)
        const uintArray = new Uint8Array(arrayBuffer)

        // Заполняем массив байтов
        for (let i = 0; i < byteString.length; i++) {
          uintArray[i] = byteString.charCodeAt(i)
        }

        // Создаем Blob из данных
        const blob = new Blob([arrayBuffer], { type: 'image/png' })

        // Создаем объект URL для Blob
        const objectUrl = URL.createObjectURL(blob)
        blobArray.push(objectUrl)
      }
    })
    dispatch(allUploadedFiles(blobArray)) // Отправляем массив Blob в Redux

    console.log(blobArray, 'blobArray') // Массив из Blob объектов
  }

  console.log(uploadedFiles, 'uploadedFiles')
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
                    background: '#000',
                    objectFit: 'cover',
                    width: '100%',
                    height: '200px',
                  },
                }}
              />
              {/* Если обрезанное изображение есть, отображаем его, иначе показываем исходное */}
              {/* {croppedImage ? (
                <img src={croppedImage} alt={`Cropped image ${index}`} />
              ) : (
                <img src={fileUrl} alt={`Original image ${index}`} />
              )} */}
            </div>
          )
        })}
      </Slider>

      <button onClick={save}>Save Cropped Images</button>
    </div>
  )
}
