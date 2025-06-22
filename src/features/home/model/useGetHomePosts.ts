import {
  pageHomeApi,
  useLazyGetPublicationsFollowersQuery,
} from '@/shared/api/pageHome/pageHomeApi'
import { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch } from '@/shared/hooks'

const PAGE_SIZE = 3

export const useGetHomePosts = () => {
  const [getHomePosts, { data, isFetching }] = useLazyGetPublicationsFollowersQuery()

  const endCursorPostId = useRef<number | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  const posts = data?.items

  useEffect(() => {
    if (!data) {
      getHomePosts({ pageSize: PAGE_SIZE })
    }
  }, [])

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && posts && posts.length < data?.totalCount) {
          endCursorPostId.current = data?.nextCursor
          getHomePosts({
            pageSize: PAGE_SIZE,
            endCursorPostId: endCursorPostId.current ?? undefined,
          })
        }
      })

      if (node) observer.current.observe(node)
    },
    [isFetching]
  )

  return {
    posts,
    lastPostElementRef,
  }
}
