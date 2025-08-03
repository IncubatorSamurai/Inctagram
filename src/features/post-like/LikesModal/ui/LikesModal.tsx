import { Modal } from '@/shared/ui/modal'
import s from './LikesModal.module.scss'
import { ReactNode } from 'react'
import { PostLikeItem } from '@/shared/api/post/likes/postLikeApi.types'
import { UserFollowStatus } from './UserFollowStatus/UserFollowStatus'
import { SearchLikes } from './SearchLikes/SearchLikes'

type Props = {
  trigger: ReactNode
  items: PostLikeItem[] | undefined
  id: number
}
export const LikesModal = ({ trigger, items, id }: Props) => {
  if (!items) return
  return (
    <Modal title="Likes" trigger={trigger} className={s.modal}>
      <div className={s.wrapper}>
        <SearchLikes id={id} />
        <div className={s.container}>
          {items.map(user => (
            <UserFollowStatus key={user?.id} user={user} />
          ))}
        </div>
      </div>
    </Modal>
  )
}
