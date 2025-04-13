"use client"
import { Modal } from '@/shared/ui/modal'
import s from "./UploadUserAvatarModal.module.scss"
import { UploadAvatar } from '@/features/settings/uploadUserAvatar/ui/UploadAvatar/UploadAvatar'
type UploadUserAvatarModal = {
  trigger:React.ReactNode,
}

export const UploadUserAvatarModal = ({trigger}:UploadUserAvatarModal) => {

  return (
    <> <Modal trigger={trigger} title={"Add a Profile Photo"} className={s.userAvatarModal} >
     <UploadAvatar/>
    </Modal></>

  )
}
