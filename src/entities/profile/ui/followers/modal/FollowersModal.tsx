import { Input } from '@/shared/ui/input'
import { Modal } from '@/shared/ui/modal'
import s from './FollowersModal.module.scss'

import { Follower } from '../follower/Follower'
import { useGetFollowersQuery } from '@/shared/api/users/usersApi'
import { useState } from 'react'

type FollowModalProps = {
  open: boolean
  fCount?: number
  userName: string
  onChange: (open: boolean) => void
}

export const FollowersModal = ({ open, onChange, fCount, userName }: FollowModalProps) => {
  const [searchUser, setSearchUser] = useState('')
  const data = useGetFollowersQuery({ userName })
  return (
    <Modal open={open} title={`${fCount} Followers`} onOpenChange={onChange} className={s.modal}>
      <div className={s.content}>
        <Input
          type="search"
          placeholder="Search"
          className={s.searchInput}
          value={searchUser}
          onChange={e => setSearchUser(e.currentTarget.value)}
        />
        <div className={s.followersList}>
          {data.currentData?.items
            ?.filter(el => el.userName.toLowerCase().includes(searchUser.toLowerCase()))
            .map(el => {
              const avatar = el.avatars.length > 0 ? el.avatars[0].url : undefined
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
