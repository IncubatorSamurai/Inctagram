import { Modal } from '@/shared/ui/modal'
import s from './LikesModal.module.scss'
import { ReactNode, useState } from 'react'
import { PostLikeItem } from '@/shared/api/post/likes/postLikeApi.types'
import { UserFollowStatus } from './UserFollowStatus/UserFollowStatus'
import { Input } from '@/shared/ui/input'
import { useDebouncedEffect } from '@/shared/hooks'
import { useInfiniteLikesSearch } from '@/features/post-like/LikesModal/model/useInfiniteLikesSearch'
import { Loader } from '@/shared/ui/loader'
import { Typography } from '@/shared/ui/typography'

type Props = {
  postId: number
  trigger: ReactNode
  items: PostLikeItem[] | undefined
}
export const LikesModal = ({ postId, trigger, items }: Props) => {
  const [searchUser, setSearchUser] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  useDebouncedEffect(() => setSearchTerm(searchUser.trim()), [searchUser], 500)

  const { lastElementRef, likesUsers, isFetching, hasNextPage, isLoading } = useInfiniteLikesSearch(
    {
      searchTerm,
      postId,
    }
  )

  const showLoader = isFetching && searchTerm && isLoading

  if (!items) return

  return (
    <Modal title="Likes" trigger={trigger} className={s.modal}>
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
              {likesUsers.map((user, index) => {
                const isLastUser = index === likesUsers.length - 1
                return (
                  <UserFollowStatus
                    key={user?.id}
                    user={user}
                    ref={isLastUser ? lastElementRef : null}
                  />
                )
              })}
            </>
          )}
        </div>
        {isFetching && hasNextPage && (
          <Typography variant="regular_text_14">...Loading...</Typography>
        )}
      </div>
    </Modal>
  )
}
