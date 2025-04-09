import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { DialogTitle } from '@/shared/ui/modal'
import Image from 'next/image'
import { TextArea } from '@/shared/ui/textarea'
import { ChangeEvent, useState } from 'react'
import Slider from 'react-slick'
import { removeFiles, selectFiles } from '@/shared/store'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useCreatePostMutation, useUploadImageForPostMutation } from '@/shared/api/post/postApi'
import { useRouter } from '@/i18n/routing'
import { PATH } from '@/shared/config/routes'
import { sliderSettings } from '@/shared/config/sliderSettings'
import { SwitchStep } from '@/features/post'
import { useTranslations } from 'next-intl'
import { convertBlobUrlsToFiles } from '../lib/convertBlobUrlsToFiles'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import s from './Publication.module.scss'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'

type Props = {
  closeAllModals: () => void
}

export const Publication = ({ closeAllModals }: Props) => {
  const t = useTranslations('post')
  const [description, setDescription] = useState('')
  const files = useAppSelector(selectFiles)

  const [uploadImageForPost, { isLoading: isLoadingUploadImage }] = useUploadImageForPostMutation()
  const [createPost, { isLoading: isLoadingCreatePost }] = useCreatePostMutation()

  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleCreatePost = async () => {
    try {
      const filesForUpload = await convertBlobUrlsToFiles(files)

      const formData = new FormData()
      filesForUpload.forEach(file => formData.append('file', file))

      const uploadImageResponse = await uploadImageForPost(formData).unwrap()

      await createPost({ description, childrenMetadata: uploadImageResponse.images }).unwrap()
      router.push(PATH.HOME)
      closeAllModals()
      dispatch(removeFiles())
    } catch (e) {
      console.error('create post error', e)
    }
  }

  if (isLoadingUploadImage || isLoadingCreatePost) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className={s.header}>
        <SwitchStep />
        <DialogTitle className={s.DialogTitle}>
          <Typography variant="h1">{t('publication')}</Typography>
        </DialogTitle>
        <Button variant="text" onClick={handleCreatePost}>
          {t('publicationHeader')}
        </Button>
      </div>

      <div className={s.contentContainer}>
        <div className={s.imageSide}>
          <div className={s.sliderContainer}>
            <Slider {...sliderSettings}>
              {files.map(file => (
                <Image
                  key={file.id}
                  className={s.image}
                  src={file.filteredFileUrl ?? file.croppedFileUrl ?? file.fileUrl}
                  width={490}
                  height={502}
                  alt="publication image"
                />
              ))}
            </Slider>
          </div>
        </div>

        <div className={s.editSide}>
          <div className={s.descriptionWrapper}>
            <div className={s.avatarWithNameWrapper}>
              {/* <Image className={s.avatar} src={''} width={36} height={36} alt="user avatar" /> */}
              <ImageOutlineIcon className={s.avatar} />
              <Typography variant="medium_text_16">URLProfiele</Typography>
            </div>

            <div className={s.textareaWithCharCountWrapper}>
              <TextArea
                title={t('addPublicationDescriptions')}
                onChange={handleChange}
                error={description.length > 500 ? t('charCountError') : undefined}
              />
              <Typography variant="small_text">{description.length}/500</Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
