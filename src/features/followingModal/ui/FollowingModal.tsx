'use client'
import React, { useEffect } from 'react'
import { Modal } from '@/shared/ui/modal'
import s from './FollowingModal.module.scss'
import { useLazyGetFollowingByUserNameQuery } from '@/shared/api/users/usersApi'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'

type Props = {
  followingCount: number
  userName: string
}

export const FollowingModal = ({ followingCount, userName }: Props) => {
  const t = useTranslations('profile')

  const [fetchFollowing, { data }] = useLazyGetFollowingByUserNameQuery()

  useEffect(() => {
    fetchFollowing({
      userName,
    })
  }, [])

  return (
    <Modal
      className={s.modal}
      title={`${followingCount} Following`}
      trigger={
        <div className={s.trigger}>
          <Typography variant={'bold_text_14'}>{followingCount}</Typography>
          <Typography variant={'regular_text_14'}>{t('following')}</Typography>
        </div>
      }
    ></Modal>
  )
}
