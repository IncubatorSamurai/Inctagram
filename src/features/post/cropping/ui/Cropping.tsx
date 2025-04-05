import { Photo, resetCropping, saveCropFile, selectFiles } from '@/shared/store'
import s from './Cropping.module.scss'
import Cropper from 'react-easy-crop'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useState } from 'react'
import { Dropdown } from '@/shared/ui/dropdown'
import { ExpandOutlineIcon } from '@/shared/assets/icons/ExpandOutlineIcon'
import { Button } from '@/shared/ui/button'
import { Expand } from '../../Expand/Expand'
import Slider from 'react-slick'
import { sliderSettings } from '@/shared/config/sliderSettings'
import Image from 'next/image'

export const Cropping = () => {
  const files = useAppSelector(selectFiles)
  const [selectedFile, setSelectedFile] = useState<Photo | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  const settings = {
    ...sliderSettings,
    initialSlide: slideIndex,
    beforeChange: (oldIndex: number, newIndex: number) => setSlideIndex(newIndex),
  }

  return (
    <div className={s.container}>
      {selectedFile ? (
        <ImageCropDialog setSelectedFile={setSelectedFile} selectedFile={selectedFile} />
      ) : (
        <>
          <div className={s.sliderContainer}>
            <Slider {...settings}>
              {files.map(file => (
                <Image
                  key={file.id}
                  className={s.image}
                  src={file.editedFileUrl ?? file.fileUrl}
                  width={490}
                  height={500}
                  alt="image for new post"
                />
              ))}
            </Slider>
          </div>
          <Button variant="icon" className={s.cropButton} onClick={() => setSelectedFile(files[slideIndex])}><ExpandOutlineIcon /></Button>
        </>
      )}
    </div>
  )
}

type Props = {
  setSelectedFile: (selectedFile: Photo | null) => void
  selectedFile: Photo
}

type Area = {
  width: number
  height: number
  x: number
  y: number
}

export const getCroppedFile = (
  fileUrl: string,
  croppedAreaPixels: Area
): Promise<string | null> => {
  return new Promise(resolve => {
    const { width, height, x, y } = croppedAreaPixels
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')

    const imageObj = new window.Image() as HTMLImageElement
    imageObj.src = fileUrl

    imageObj.onload = () => {
      context?.drawImage(imageObj, x, y, width, height, 0, 0, width, height)

      canvas.toBlob(file => {
        if (file) {
          resolve(URL.createObjectURL(file))
        } else {
          resolve(null)
        }
      }, 'image/jpeg')
    }
  })
}

export const ImageCropDialog = ({ setSelectedFile, selectedFile }: Props) => {
  const [crop, setCrop] = useState(selectedFile.cropInit || { x: 0, y: 0 })
  const [zoom, setZoom] = useState(selectedFile.zoomInit || 1)
  const [aspect, setAspect] = useState(selectedFile.aspectInit || 1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | Area>(null)

  const dispatch = useAppDispatch()

  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onSaveCropFile = async () => {
    try {
      const croppedFileUrl = await getCroppedFile(selectedFile.fileUrl, croppedAreaPixels as Area)

      dispatch(
        saveCropFile({
          file: { ...selectedFile, zoomInit: zoom, cropInit: crop, aspectInit: aspect },
          croppedFileUrl: croppedFileUrl,
        })
      )
      setSelectedFile(null)
    } catch (error) {
      console.error('Error cropping file', error)
    }
  }

  const onResetCropping = () => {
    dispatch(resetCropping({ file: selectedFile }))

    setSelectedFile(null)
  }

  return (
    <div className={s.container}>
      <div>
        <Cropper
          image={selectedFile?.fileUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              background: 'transparent',
              width: '100%',
              height: '90%',
              boxShadow: 'none',
            },
          }}
        />
      </div>

      <div className={s.actionButtons}>
        <Dropdown iconTrigger={<ExpandOutlineIcon />} classItemsContainer="dropdownItemsContainer">
          <Expand getAspect={setAspect} />
        </Dropdown>

        <Button onClick={onSaveCropFile}>Save</Button>
        <Button variant="outline" onClick={() => setSelectedFile(null)}>
          Cancel
        </Button>
        <Button variant="outline" onClick={onResetCropping}>
          Reset
        </Button>
      </div>
    </div>
  )
}
