import { ArrowIosBackIcon } from '@/shared/assets/icons/ArrowIosBackIcon'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import { Button } from '@/shared/ui/button'
import { DialogTitle } from '@/shared/ui/modal'
import { TextArea } from '@/shared/ui/textarea'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { MAX_DESCRIPTION_LENGTH, usePublication } from '../lib/usePublication'
import s from './Publication.module.scss'
import { CustomSlider } from '@/shared/ui/customSlider/CustomSlider'

type Props = {
  closeAllModals: () => void
  setCurrentStep: () => void
}

export const Publication = ({ closeAllModals, setCurrentStep }: Props) => {
  const t = useTranslations('post')
  const { description, files, isLoading, setDescription, handleCreatePost } =
    usePublication(closeAllModals)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className={s.header}>
        <Button variant={'icon'} onClick={setCurrentStep}>
          <ArrowIosBackIcon />
        </Button>
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
            <CustomSlider>
              {files.map(file => (
                <Image
                  key={file.id}
                  className={s.image}
                  src={file.filteredFileUrl || file.croppedFileUrl || file.fileUrl}
                  width={490}
                  height={502}
                  alt="publication image"
                />
              ))}
            </CustomSlider>
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
                onChange={e => setDescription(e.target.value)}
                error={
                  description.length > MAX_DESCRIPTION_LENGTH ? t('charCountError') : undefined
                }
              />
              <Typography variant="small_text">
                {description.length}/{MAX_DESCRIPTION_LENGTH}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
