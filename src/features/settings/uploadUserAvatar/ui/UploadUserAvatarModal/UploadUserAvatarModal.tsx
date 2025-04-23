'use client'
import { Modal } from '@/shared/ui/modal'
import s from './UploadUserAvatarModal.module.scss'
import { UploadAvatar } from '@/features/settings/uploadUserAvatar/ui/UploadAvatar/UploadAvatar'
import { useState } from 'react'

type UploadUserAvatarModal = {
  trigger: React.ReactNode
}

export const UploadUserAvatarModal = ({ trigger }: UploadUserAvatarModal) => {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <Modal
        trigger={trigger}
        title={'Add a Profile Photo'}
        className={s.userAvatarModal}
        open={toggle}
        onOpenChange={setToggle}
      >
        <UploadAvatar onOpenChange={setToggle} />
      </Modal>
    </>
  )
}
