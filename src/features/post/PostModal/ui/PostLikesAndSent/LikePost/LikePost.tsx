import { Button } from '@/shared/ui/button'
import { HeartOutlineIcon } from '@/shared/assets/icons/HeartOutlineIcon'
import { postLikeApi, useLikeStatusMutation } from '@/shared/api/post/likes/postLikeApi'
import { PostLikeItem } from '@/shared/api/post/likes/postLikeApi.types'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useAppDispatch } from '@/shared/hooks'
import { HeartIcon } from '@/shared/assets/icons/HeartIcon'
import { useEffect, useState } from 'react'

type Props = {
  id: string
  likesItems: PostLikeItem[] | undefined
}

export const LikePost = ({ id, likesItems }: Props) => {
  const [isMyLike, setIsMyLike] = useState(false)
  const { data: meData } = useMeQuery()
  const [like] = useLikeStatusMutation()
  const isAlreadyLike = likesItems?.some(item => item.userId === meData?.userId)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsMyLike(isAlreadyLike ?? false)
  }, [isAlreadyLike])

  const updatePostLikesCache = () => {
    dispatch(
      postLikeApi.util.updateQueryData('getPostLikes', id, draft => {
        if (isAlreadyLike) {
          draft.totalCount -= 1
        } else {
          draft.totalCount += 1
        }
      })
    )
  }

  const handleClick = () => {
    like({ id, likeStatus: isAlreadyLike ? 'DISLIKE' : 'LIKE' })
    setIsMyLike(isAlreadyLike ? false : true)
    updatePostLikesCache()
  }

  return (
    <Button variant="icon" onClick={handleClick}>
      {isMyLike ? <HeartIcon color="var(--color-danger-500)" /> : <HeartOutlineIcon />}
    </Button>
  )
}
