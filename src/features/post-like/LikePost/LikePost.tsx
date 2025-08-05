import { Button } from '@/shared/ui/button'
import { HeartOutlineIcon } from '@/shared/assets/icons/HeartOutlineIcon'
import { postLikeApi, useLikeStatusMutation } from '@/shared/api/post/likes/postLikeApi'
import { PostLikeItem } from '@/shared/api/post/likes/postLikeApi.types'
import { useAppDispatch } from '@/shared/hooks'
import { HeartIcon } from '@/shared/assets/icons/HeartIcon'
import { useEffect, useState } from 'react'
import { testUser } from '../../post/PostModal/consts/consts'

type Props = {
  id: number
  likesItems?: PostLikeItem[] | undefined
  isLiked?: boolean
}

export const LikePost = ({ id, isLiked }: Props) => {
  const [isMyLike, setIsMyLike] = useState(false)
  const [like] = useLikeStatusMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsMyLike(isLiked ?? false)
  }, [isLiked])

  const updatePostLikesCache = () => {
    dispatch(
      postLikeApi.util.updateQueryData('getPostLikes', { postId: id }, draft => {
        if (isMyLike) {
          draft.items.splice(-1, 1)
          draft.totalCount -= 1
        } else {
          draft.items.push(testUser)
          draft.totalCount += 1
        }
      })
    )
  }

  const handleClick = () => {
    updatePostLikesCache()
    like({ id, likeStatus: isMyLike ? 'DISLIKE' : 'LIKE' })
    setIsMyLike(isMyLike ? false : true)
  }

  return (
    <Button variant="icon" onClick={handleClick}>
      {isMyLike ? <HeartIcon color="var(--color-danger-500)" /> : <HeartOutlineIcon />}
    </Button>
  )
}
