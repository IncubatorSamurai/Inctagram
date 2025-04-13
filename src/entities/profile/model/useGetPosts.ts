import { useCallback, useEffect, useRef } from 'react'
import { GetPostsByUserIdRespond } from '@/shared/api/post/postApi.types'
import { useParams } from 'next/navigation'
import { publicPostApi, useLazyGetPublicPostsByUserIdQuery } from '@/shared/api/post/publicPosts'
import { useAppDispatch } from '@/shared/hooks'

type Props = {
  resPublicPosts?: GetPostsByUserIdRespond
}

export const useGetPosts = ({ resPublicPosts }: Props) => {
  const params = useParams()
  const { userId: id } = params
  const userId = id as string

  const dispatch = useAppDispatch()
  const needInit = useRef(!!resPublicPosts)
  const endCursorPostId = useRef<string | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const [fetchPosts, { data: publicPostsByUserId, isFetching }] =
    useLazyGetPublicPostsByUserIdQuery()

  const posts = publicPostsByUserId?.items
  const totalCount = publicPostsByUserId?.totalCount ?? 0

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

  useEffect(() => {
    if (!posts) {
      if (resPublicPosts && endCursorPostId.current) {
        fetchPosts({
          userId,
          pageSize: 9,
          endCursorPostId: endCursorPostId.current ?? undefined,
        })
      } else {
        fetchPosts({
          userId,
          pageSize: 8,
          endCursorPostId: null,
        })
      }
    }
  }, [])

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && posts && posts.length < totalCount) {
          endCursorPostId.current = posts[posts.length - 1]?.id.toString()
          fetchPosts({ userId, pageSize: 9, endCursorPostId: endCursorPostId.current ?? undefined })
        }
      })

      if (node) observer.current.observe(node)
    },
    [isFetching]
  )

  return { posts, lastPostElementRef, isFetching }
}
