import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver'
import { GetPostsByUserIdRespond } from '@/shared/api/post/postApi.types'
import { useParams } from 'next/navigation'
import { publicPostApi, useLazyGetPublicPostsByUserIdQuery } from '@/shared/api/post/publicPosts'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'

type Props = {
  resPublicPosts?: GetPostsByUserIdRespond
}

export const useGetPosts = ({ resPublicPosts }: Props) => {
  const params = useParams()
  const { userId: id } = params
  const userId = id as string

  const dispatch = useAppDispatch()
  const endCursorPostIdRef = useRef<null | string>(null)
  const needInit = useRef(!!resPublicPosts)
  const { isInView, targetRef } = useIntersectionObserver({ threshold: 0.5 })
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [fetchPosts, { data: publicPostsByUserId, isFetching }] =
    useLazyGetPublicPostsByUserIdQuery()

  useEffect(() => {
    if (needInit.current && resPublicPosts) {
      dispatch(
        publicPostApi.util.upsertQueryData(
          'getPublicPostsByUserId',
          {
            userId,
            endCursorPostId: null,
          },
          resPublicPosts
        )
      )
      needInit.current = false
    }
  }, [resPublicPosts])

  useEffect(() => {
    return () => {
      dispatch(publicPostApi.util.resetApiState())
    }
  }, [])

  const posts = publicPostsByUserId?.items
  const totalCount = publicPostsByUserId?.totalCount ?? 0

  useEffect(() => {
    if (!posts) {
      if (resPublicPosts) {
        endCursorPostIdRef.current =
          resPublicPosts?.items[resPublicPosts?.items.length - 1]?.id.toString()
        fetchPosts({
          userId,
          pageSize: 8,
          endCursorPostId: endCursorPostIdRef.current ?? undefined,
        })
      } else {
        fetchPosts({
          userId,
          pageSize: 8,
          endCursorPostId: endCursorPostIdRef.current ?? undefined,
        })
      }
    }
  }, [])

  useEffect(() => {
    if (posts) {
      endCursorPostIdRef.current = posts[posts.length - 1]?.id.toString()
    }
  }, [posts])

  useEffect(() => {
    if (posts && isInView && !isFetching && posts.length < totalCount) {
      fetchPosts({ userId, pageSize: 8, endCursorPostId: endCursorPostIdRef.current ?? undefined })
    }
  }, [isInView, totalCount, userId])

  return { posts, targetRef, isLoggedIn }
}
