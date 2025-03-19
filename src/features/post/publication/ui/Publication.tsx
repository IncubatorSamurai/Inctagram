import s from './Publication.module.scss'
import { ArrowBackOutlineIcon } from '@/shared/assets/icons/ArrowBackOutlineIcon'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { DialogTitle, Modal } from '@/shared/ui/modal'
import Image from 'next/image'
import testImg1 from '../assets/3d_1.jpg'
import testImg2 from '../assets/3d_2.jpg'
import { TextArea } from '@/shared/ui/textarea'
import { ChangeEvent, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { sliderSettings } from '../../UploadImages/consts/consts'

export const Publication = () => {
  const [text, setText] = useState('')

  const uploadedFiles = [testImg1, testImg2]

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
      <Modal className={s.modal} open onOpenChange={() => {}} aria-describedby="modalDescription">
        <div className={s.header}>
          <Button variant="icon">
            <ArrowBackOutlineIcon />
          </Button>
          <DialogTitle className={s.DialogTitle}>
            <Typography variant="h1">Publication</Typography>
          </DialogTitle>
          <Button variant="text">Publish</Button>
        </div>

        <div className={s.contentContainer}>
          <div className={s.imageSide}>
            {uploadedFiles.length > 1 ? (
              <div className={s.sliderContainer}>
                <Slider {...sliderSettings}>
                  {uploadedFiles.map((fileUrl, index) => (
                    <Image
                      key={index}
                      className={s.image}
                      src={fileUrl}
                      width={490}
                      height={500}
                      alt="publication image"
                    />
                  ))}
                </Slider>
              </div>
            ) : (
              <Image
                className={s.image}
                src={uploadedFiles.length === 1 ? uploadedFiles[0] : ''}
                width={490}
                height={500}
                alt="publication image"
              />
            )}
          </div>

          <div className={s.editSide}>
            <div className={s.descriptionWrapper}>
              <div className={s.avatarWithNameWrapper}>
                <Image
                  className={s.avatar}
                  src={testImg1}
                  width={36}
                  height={36}
                  alt="user avatar"
                />
                <Typography variant="medium_text_16">URLProfiele</Typography>
              </div>

              <div className={s.textareaWithCharCountWrapper}>
                <TextArea
                  title="Add publication descriptions"
                  onChange={handleChange}
                  error={text.length > 500 ? 'Maximum number of characters 500' : undefined}
                />
                <Typography variant="small_text">{text.length}/500</Typography>
              </div>
            </div>
          </div>
        </div>
      </Modal>
  )
}
