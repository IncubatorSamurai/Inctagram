'use client'
import { useState } from 'react'
import { useInfiniteFollowerSearch } from '../modal/model/useInfiniteFollowersSearch'
import { useAppSelector, useDebouncedEffect } from '@/shared/hooks'
import { toast } from 'react-toastify'
import { Loader } from '@/shared/ui/loader'
import { Typography } from '@/shared/ui/typography'
import s from './FollowersContent.module.scss'
import { useTranslations } from 'next-intl'
import { Follower } from '../follower/Follower'
import { selectIsLoggedIn } from '@/shared/store'
import { useMeQuery } from '@/shared/api/auth/authApi'

type Props = {
  searchUser: string
  userName: string
}

export const FollowerContent = ({ searchUser, userName }: Props) => {
  const t = useTranslations('search')
  const [searchTerm, setSearchTerm] = useState('')
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  useDebouncedEffect(() => setSearchTerm(searchUser.trim()), [searchUser], 1000)

  const { lastElementRef,updateQuery, users, isFetching, isError, nextCursor, isLoading } =
    useInfiniteFollowerSearch({
      searchTerm,
      userName,
    })

  const { data: authData } = useMeQuery(undefined, { skip: !isLoggedIn })
  const showLoader = isFetching && searchTerm && isLoading

  if (showLoader) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    )
  }

  if (isError) {
    toast.error(t('searchError'))
  }

  return (
    <div className={s.searchUserContainer}>
      <div className={s.followersList}>
        {users.map((user, i) => {
          const avatarSrc = user?.avatars?.[0]?.url
          const isLastUser = i === users.length - 1
          return (
            <Follower
              updateQuery={updateQuery}
              isMe={user.userId === authData?.userId}
              ref={isLastUser ? lastElementRef : null}
              key={user.id}
              userId={user.userId}
              userName={user.userName}
              avatarSrc={avatarSrc}
              isFollowing={user.isFollowing}
            />
          )
        })}
      </div>

      {isFetching && nextCursor && (
        <Typography variant="regular_text_14">{t('loading')}</Typography>
      )}
    </div>
  )
}
