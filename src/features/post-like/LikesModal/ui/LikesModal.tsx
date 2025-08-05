import { Modal } from '@/shared/ui/modal'
import s from './LikesModal.module.scss'
import { ReactNode, useState } from 'react'
import { UserFollowStatus } from './UserFollowStatus/UserFollowStatus'
import { SearchLikes } from './SearchLikes/SearchLikes'
import { useInfiniteLikesSearch } from '@/features/post-like/LikesModal/model/useInfiniteLikesSearch'
import { Loader } from '@/shared/ui/loader'

type Props = {
  trigger: ReactNode
  postId: number
}
export const LikesModal = ({ trigger, postId }: Props) => {
  const [searchTerm, setSearchTerm] = useState('')

  const { lastElementRef, likesUsers, isFetching, isLoading, updateQuery } = useInfiniteLikesSearch(
    {
      postId,
      searchTerm,
    }
  )

  const showLoader = isFetching && searchTerm && isLoading

  if (!likesUsers) return
  return (
    <Modal title="Likes" trigger={trigger} className={s.modal}>
      <div className={s.wrapper}>
        <SearchLikes setTerm={setSearchTerm} />
        <div className={s.list}>
          {showLoader ? (
            <div className={s.loader}>
              <Loader />
            </div>
          ) : (
            <>
              {likesUsers.map((user, index) => {
                const isLastUser = index === likesUsers.length - 1

                return (
                  <UserFollowStatus
                    key={user?.id}
                    user={user}
                    ref={isLastUser ? lastElementRef : null}
                    updateQuery={updateQuery}
                  />
                )
              })}
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
