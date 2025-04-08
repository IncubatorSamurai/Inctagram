import { ExpandOutlineIcon } from '@/shared/assets/icons/ExpandOutlineIcon'
import { sliderSettings } from '@/shared/config/sliderSettings'
import { useAppSelector } from '@/shared/hooks'
import { selectFiles } from '@/shared/store'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import { useState } from 'react'
import Slider from 'react-slick'
import s from './Cropping.module.scss'
import { ImageCropDialog } from './ImageCropDialog'
import { Photo } from '@/shared/types'

export const Cropping = () => {
  const files = useAppSelector(selectFiles)
  const [selectedFile, setSelectedFile] = useState<Photo | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  const settings = {
    ...sliderSettings,
    initialSlide: slideIndex,
    beforeChange: (_: number, newIndex: number) => setSlideIndex(newIndex),
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
                  src={file.croppedFileUrl ?? file.fileUrl}
                  width={490}
                  height={502}
                  alt="image for new post"
                />
              ))}
            </Slider>
          </div>
          <Button
            variant="icon"
            className={s.cropButton}
            onClick={() => setSelectedFile(files[slideIndex])}
          >
            <ExpandOutlineIcon />
          </Button>
        </>
      )}
    </div>
  )
}
