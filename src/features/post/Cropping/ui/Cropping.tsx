import { ExpandOutlineIcon } from '@/shared/assets/icons/ExpandOutlineIcon'
import { useAppSelector } from '@/shared/hooks'
import { selectFiles } from '@/shared/store'
import { Button } from '@/shared/ui/button'
import Image from 'next/image'
import { useState } from 'react'
import s from './Cropping.module.scss'
import { ImageCropDialog } from './ImageCropDialog'
import { Photo } from '@/shared/types'
import { CustomSlider } from '@/shared/ui/customSlider/CustomSlider'

export const Cropping = () => {
  const files = useAppSelector(selectFiles)
  const [selectedFile, setSelectedFile] = useState<Photo | null>(null)
  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <div className={s.container}>
      {selectedFile ? (
        <ImageCropDialog setSelectedFile={setSelectedFile} selectedFile={selectedFile} />
      ) : (
        <>
          <div className={s.sliderContainer}>
            <CustomSlider
              className={s.croppingSlider}
              initialSlide={slideIndex}
              onSlideChange={({ activeIndex }) => setSlideIndex(activeIndex)}
            >
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
            </CustomSlider>
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
