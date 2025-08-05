'use client'
import React, { useState } from 'react'
import { Modal } from '@/shared/ui/modal'
import s from './FollowingModal.module.scss'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { BlankCover } from '@/shared/ui/profile/blankCover'
import { Input } from '@/shared/ui/input'
import { FollowButton } from '@/features/followUser'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useAppSelector, useDebouncedEffect } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store'
import { useInfiniteFollowingSearch } from '@/features/followingModal/modal/useInfiniteFollowingSearch'
import { Loader } from '@/shared/ui/loader'
import { Link } from '@/i18n/routing'

type Props = {
  followingCount: number
  userName: string
}

export const FollowingModal = ({ followingCount, userName }: Props) => {
  const t = useTranslations('profile')
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [searchUser, setSearchUser] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  useDebouncedEffect(() => setSearchTerm(searchUser.trim()), [searchUser], 500)

  const { lastElementRef, followingUsers, isFetching, isLoading, updateQuery } =
    useInfiniteFollowingSearch({
      searchTerm,
      userName,
    })
  const { data: meData } = useMeQuery(undefined, { skip: !isLoggedIn })

  const showLoader = isFetching && searchTerm && isLoading

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
    >
      <div className={s.container}>
        <Input
          type={'search'}
          placeholder={'Search'}
          value={searchUser}
          onChange={e => setSearchUser(e.target.value)}
        />
        <div className={s.list}>
          {showLoader ? (
            <div className={s.loader}>
              <Loader />
            </div>
          ) : (
            <>
              {followingUsers?.map((item, index) => {
                const avatarUrl = item?.avatars?.[0]?.url
                const isLastUser = index === followingUsers.length - 1
                const profileLink = `/profile/${item.userId}`

                return (
                  <div
                    key={item.id}
                    className={s.followingItem}
                    ref={isLastUser ? lastElementRef : null}
                  >
                    <Link href={profileLink} className={s.avatarAndName} shallow scroll={false}>
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          className={s.avatar}
                          width={36}
                          height={36}
                          alt={'avatar'}
                        />
                      ) : (
                        <BlankCover className={s.blankCover} />
                      )}
                      <Typography variant="regular_text_16">{item.userName}</Typography>
                    </Link>
                    {item.userId !== meData?.userId && (
                      <FollowButton
                        userId={item.userId}
                        userName={item.userName}
                        isFollowing={item.isFollowing}
                        updateQuery={updateQuery}
                      />
                    )}
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
