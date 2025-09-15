'use client'
import { Button } from '@/shared/ui/button'
import { UploadUserAvatarModal } from '@/features/settings/uploadUserAvatar/ui/UploadUserAvatarModal/UploadUserAvatarModal'
import { useDeleteUserAvatarMutation, useGetProfileQuery } from '@/shared/api/profile/profileApi'
import { BlankCover } from '@/shared/ui/profile/blankCover'
import Image from 'next/image'
import { CloseIcon } from '@/shared/assets/icons/CloseIcon'
import { DeleteAvatarModal } from '@/features/settings/uploadUserAvatar/ui/deleteAvatarModal/DeleteAvatarModal'
import s from './UploadUserAvatar.module.scss'

export const UploadUserAvatar = () => {
  const { data } = useGetProfileQuery()
  const [deleteAvatar] = useDeleteUserAvatarMutation()
  const avatars = data?.avatars || []
  console.log('avatars', avatars)
  console.log('data', data)
  const onDeleteAvatar = async () => {
    try {
      await deleteAvatar().unwrap()
      console.log('удален ')
      console.log('после удаление', avatars)
    } catch (e) {
      console.error('Ошибка при удалении аватара:', e)
    }
  }
  return (
    <div className={s.container}>
      <div className={s.avatar}>
        {avatars.length > 0 && (
          <DeleteAvatarModal
            title={'Delete Photo'}
            trigger={
              <Button variant={'icon'} className={s.delete_avatar}>
                <CloseIcon />
              </Button>
            }
            onDeleteAvatar={onDeleteAvatar}
          />
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
