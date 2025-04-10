"use client"
import { ImageIcon } from '@/shared/assets/icons/ImageIcon'
import s from './UploadUserAvatar.module.scss'
import { Button } from '@/shared/ui/button'
import {
  UploadUserAvatarModal
} from '@/features/settings/uploadUserAvatar/ui/UploadUserAvatarModal/UploadUserAvatarModal'
import { useProfileData } from '@/entities/profile/model'
import { ProfileUserResponse } from '@/shared/api/publicUser/publicUserApi.types'
import { GetPostsByUserIdRespond } from '@/shared/api/post/postApi.types'
import Image from 'next/image'
import { BlankCover } from '@/shared/ui/profile/blankCover'

// type Props = {
//   resPublicData?: ProfileUserResponse
// }
export const UploadUserAvatar = () => {
  // const { avatarSrc } =
  //   useProfileData({
  //     resPublicData,
  //   })


  return (
    <div className={s.container}>
      <div className={s.avatar}>
        {/*{avatarSrc ? (*/}
        {/*  <Image src={avatarSrc} className={s.avatar} width={200} height={200} alt={'avatar'} />*/}
        {/*) : (*/}
        {/*  <BlankCover />*/}
        {/*)}*/}
        {/*<ImageIcon width={48} height={48} />*/}
      </div>
<UploadUserAvatarModal trigger={ <Button variant="outline"> Add a Profile Photo</Button>} />

    </div>
  )
}
