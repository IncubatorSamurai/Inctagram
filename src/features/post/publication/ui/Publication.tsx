import s from './Publication.module.scss'
import { ArrowBackOutlineIcon } from '@/shared/assets/icons/ArrowBackOutlineIcon'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { DialogTitle, Modal } from '@/shared/ui/modal'
import Image from 'next/image'
import testImg1 from '../assets/3d_1.jpg'
import { TextArea } from '@/shared/ui/textarea'
import { ChangeEvent, useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { selectCroppedFiles, selectUploadedFiles } from '@/shared/store'
import { useAppSelector } from '@/shared/hooks'
import { useCreatePostMutation, useUploadImageForPostMutation } from '@/shared/api/post/postApi'
import { useRouter } from '@/i18n/routing'
import { PATH } from '@/shared/config/routes'
import { sliderSettings } from '@/shared/config/sliderSettings'

export const Publication = () => {
  const [description, setDescription] = useState('')
  const uploadedFiles = useAppSelector(selectUploadedFiles)
  const croppedFiles = useAppSelector(selectCroppedFiles)
  const [uploadImageForPost] = useUploadImageForPostMutation()
  const [createPost] = useCreatePostMutation()
  const router = useRouter()

  // const convertBlobUrlsToFiles = async (blobUrls: string[]) => {
  //   const filePromises = blobUrls.map(async (url, i) => {
  //     const response = await fetch(url)
  //     const blob = await response.blob()

  //     let extension = 'jpeg'
  //     if (blob.type === 'png') {
  //       extension = 'png'
  //     }

  //     const file = new File([blob], `file-${i}.${extension}`, { type: blob.type })
  //     return file
  //   })

  //   return Promise.all(filePromises)
  // }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const onClickHandler = async () => {
    try {
      const files = await convertBlobUrlsToFiles(uploadedFiles)

      const formData = new FormData()
      files.forEach(file => formData.append('file', file))

      const res = await uploadImageForPost(formData).unwrap()

      await createPost({ description, childrenMetadata: res.images }).unwrap()
      router.push(PATH.HOME)
    } catch (e) {
      console.error('rejected', e)
    }
  }

  return (
    <>
      <div className={s.contentContainer}>
        <div className={s.imageSide}>
          <div className={s.sliderContainer}>
            <Slider {...sliderSettings}>
              {croppedFiles.map((fileUrl, index) => (
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
        </div>

        <div className={s.editSide}>
          <div className={s.descriptionWrapper}>
            <div className={s.avatarWithNameWrapper}>
              <Image className={s.avatar} src={testImg1} width={36} height={36} alt="user avatar" />
              <Typography variant="medium_text_16">URLProfiele</Typography>
            </div>

            <div className={s.textareaWithCharCountWrapper}>
              <TextArea
                title="Add publication descriptions"
                onChange={handleChange}
                error={description.length > 500 ? 'Maximum number of characters 500' : undefined}
              />
              <Typography variant="small_text">{description.length}/500</Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
