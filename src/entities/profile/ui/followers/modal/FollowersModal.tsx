'use client'
import { Input } from '@/shared/ui/input'
import { Modal } from '@/shared/ui/modal'
import s from './FollowersModal.module.scss'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FollowerContent } from '../followersContent/FollowersContent'
import { Typography } from '@/shared/ui/typography'

type FollowModalProps = {
  fCount: number
  userName: string
}

export const FollowersModal = ({ fCount, userName }: FollowModalProps) => {
  const [searchUser, setSearchUser] = useState('')
  const t = useTranslations('search')
  const t2 = useTranslations('profile')
  return (
    <Modal
      trigger={
        <div className={s.trigger}>
          <Typography variant={'bold_text_14'}>{fCount}</Typography>
          <Typography variant={'regular_text_14'}>{t2('followers')}</Typography>
        </div>
      }
      title={`${fCount} Followers`}
      className={s.modal}
    >
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
