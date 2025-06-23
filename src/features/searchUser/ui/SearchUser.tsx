'use client'
import GlobalLoader from '@/entities/loading/loading'
import { Link } from '@/i18n/routing'
import { PATH } from '@/shared/config/routes'
import { useDebouncedEffect } from '@/shared/hooks'
import { BlankCover } from '@/shared/ui/profile/blankCover'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useInfiniteSearch } from '../model/useInfiniteSearch'
import s from './SearchUser.module.scss'

type Props = {
  searchUser: string
}

export const SearchUser = ({ searchUser }: Props) => {
  const t = useTranslations('search')
  const [searchTerm, setSearchTerm] = useState('')

  useDebouncedEffect(() => setSearchTerm(searchUser.trim()), [searchUser], 500)

  const { lastElementRef, users, isFetching, isError, hasNextPage, isLoading } = useInfiniteSearch({
    searchTerm,
  })

  const showLoader = isFetching && searchTerm && isLoading
  const showEmptyState = !searchTerm || (!users.length && !isFetching)

  if (showLoader) {
    return <GlobalLoader />
  }

  if (isError) {
    toast.error(t('searchError'))
  }

  return (
    <div className={s.searchUserContainer}>
      {showEmptyState ? (
        <div className={s.searchUserEmptyWrapper}>
          <Typography variant="bold_text_14">{t('searchUsersEmptyText')}</Typography>
          <Typography variant="small_text">{t('noRecentRequests')}</Typography>
        </div>
      ) : (
        users.map((user, i) => {
          const avatarUrl = user?.avatars?.[0]?.url
          const isLastUser = i === users.length - 1

          return (
            <div className={s.userWrapper} key={user.id} ref={isLastUser ? lastElementRef : null}>
              {avatarUrl ? (
                <Image src={avatarUrl} width={48} height={48} alt="avatar" className={s.avatar} />
              ) : (
                <BlankCover className={s.blankCover} />
              )}
              <div className={s.userInfoWrapper}>
                <Typography asChild variant="bold_text_14">
                  <Link href={`${PATH.MYPROFILE}/${user.id}`}>{user.userName}</Link>
                </Typography>
                <Typography variant="regular_text_14">
                  {user.firstName} {user.lastName}
                </Typography>
              </div>
            </div>
          )
        })
      )}

      {isFetching && hasNextPage && (
        <Typography variant="regular_text_14">{t('loading')}</Typography>
      )}
    </div>
  )
}
