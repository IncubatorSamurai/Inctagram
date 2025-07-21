'use client'
import { Input } from '@/shared/ui/input'
import { Modal } from '@/shared/ui/modal'
import s from './FollowersModal.module.scss'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FollowerContent } from '../followersContent/FollowersContent'

type FollowModalProps = {
  open: boolean
  fCount?: number
  userName: string
  onChange: (open: boolean) => void
}

export const FollowersModal = ({ open, onChange, fCount, userName }: FollowModalProps) => {
  const [searchUser, setSearchUser] = useState('')
  const t = useTranslations('search')
  return (
    <Modal open={open} title={`${fCount} Followers`} onOpenChange={onChange} className={s.modal}>
      <div className={s.content}>
        <Input
          type="search"
          placeholder={t('search')}
          className={s.searchInput}
          value={searchUser}
          onChange={e => setSearchUser(e.currentTarget.value)}
        />
        <FollowerContent searchUser={searchUser} userName={userName} />
      </div>
    </Modal>
  )
}
