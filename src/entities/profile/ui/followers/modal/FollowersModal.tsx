import { Input } from '@/shared/ui/input'
import { Modal } from '@/shared/ui/modal'
import s from './FollowersModal.module.scss'
import { useTranslations } from 'next-intl'
import { Follower } from '../follower/Follower'
import { useGetFollowersQuery } from '@/shared/api/users/usersApi'
import { useState } from 'react'
import { useDebouncedEffect } from '@/shared/hooks'

type FollowModalProps = {
  open: boolean
  fCount?: number
  userName: string
  onChange: (open: boolean) => void
}

export const FollowersModal = ({ open, onChange, fCount, userName }: FollowModalProps) => {
  const [searchUser, setSearchUser] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  useDebouncedEffect(() => setSearchQuery(searchUser.trim()), [searchUser], 1000)
  const { data } = useGetFollowersQuery(
    { userName, coursor: 0, search: searchQuery },
    {
      skip: !open,
      refetchOnMountOrArgChange: true,
    }
  )

  const t = useTranslations('search')

  const filteredFollowers = data?.items || []

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
        <div className={s.followersList}>
          {filteredFollowers.map(el => {
            const avatar = el.avatars[0]?.url
            return (
              <Follower
                isFollowedBy={el.isFollowedBy}
                key={el.id}
                userId={el.userId}
                userName={el.userName}
                avatarSrc={avatar}
                profileUrl={el.userName}
                isFollowing={el.isFollowing}
              />
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
