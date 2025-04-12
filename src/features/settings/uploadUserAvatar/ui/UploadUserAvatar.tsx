'use client'
import s from './UploadUserAvatar.module.scss'
import { Button } from '@/shared/ui/button'
import { UploadUserAvatarModal } from '@/features/settings/uploadUserAvatar/ui/UploadUserAvatarModal/UploadUserAvatarModal'
import { useDeleteUserAvatarMutation, useGetProfileQuery } from '@/shared/api/profile/profileApi'
import { BlankCover } from '@/shared/ui/profile/blankCover'
import Image from 'next/image'
import { CloseIcon } from '@/shared/assets/icons/CloseIcon'

export const UploadUserAvatar = () => {
  const { data, refetch } = useGetProfileQuery()
  const [deleteAvatar] = useDeleteUserAvatarMutation()
  const avatars = data?.avatars || []
  const onDeleteAvatar = async () => {
    try {
      await deleteAvatar().unwrap()
      await refetch() // 🔁 обновим профиль, чтобы фото исчезло
    } catch (e) {
      console.error('Ошибка при удалении аватара:', e)
    }
  }
  return (
    <div className={s.container}>
      <div className={s.avatar}>
        {avatars.length > 0 && (
          <Button variant={'icon'} className={s.delete_avatar} onClick={onDeleteAvatar}>
            <CloseIcon />
          </Button>
        )}
        {avatars.length ? (
          <Image
            src={avatars[0].url}
            className={s.avatar_img}
            width={200}
            height={200}
            alt={'avatar'}
          />
        ) : (
          <BlankCover />
        )}
      </div>
      <UploadUserAvatarModal trigger={<Button variant="outline"> Add a Profile Photo</Button>} />
    </div>
  )
}
