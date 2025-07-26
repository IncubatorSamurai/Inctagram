import { Modal } from '@/shared/ui/modal'
import s from './LikesModal.module.scss'
import { ReactNode } from 'react'
import { PostLikeItem } from '@/shared/api/post/likes/postLikeApi.types'
import { UserFollowStatus } from './UserFollowStatus/UserFollowStatus'

type Props = {
  trigger: ReactNode
  items: PostLikeItem[] | undefined
}
export const LikesModal = ({ trigger, items }: Props) => {
  console.log(items)

  if (!items) return
  return (
    <Modal open title="Likes" trigger={trigger} className={s.modal}>
      <div className={s.container}>
        {items.map(user => (
          <UserFollowStatus key={user?.id} user={user} />
        ))}
      </div>
    </Modal>
  )
}
