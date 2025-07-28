import { useLazyGetFollowersQuery, usersApi } from '@/shared/api/users/usersApi'
import { useEffect, useRef, useCallback } from 'react'

const PAGE_SIZE = 9

type Props = {
  searchTerm: string
  pageSize?: number
  userName: string
}

export type UpdateFollowingThunk = ReturnType<typeof usersApi.util.updateQueryData>

export const useInfiniteFollowerSearch = ({
  searchTerm,
  userName,
  pageSize = PAGE_SIZE,
}: Props) => {
  const prevSearchTerm = useRef('')
  const observer = useRef<IntersectionObserver | null>(null)
  const isLoading = useRef(false)

  const [fetchFollower, { data, isFetching, isError }] = useLazyGetFollowersQuery()

  const users = data?.items || []
  const paginationInfo = {
    currentPage: data?.page || 0,
    hasNextPage: (data?.page || 0) < (data?.pagesCount || 0),
    nextCoursor: data?.nextCursor,
  }

  const updateQuery = ({
    userId,
    isFollowing,
  }: {
    userId: number
    isFollowing: boolean
  }): UpdateFollowingThunk => {
    return usersApi.util.updateQueryData(
      'getFollowers',
      { userName, search: searchTerm, pageSize },
      draft => {
        const user = draft.items.find(item => item.userId === userId)
        if (user) {
          user.isFollowing = isFollowing
        }
      }
    )
  }

  useEffect(() => {
    if (!searchTerm) {
      if (!userName) return
      fetchFollower({
        userName,
        pageSize,
      })
      prevSearchTerm.current = ''
      return
    }

    if (prevSearchTerm.current !== searchTerm || !searchTerm) {
      fetchFollower({
        userName,
        search: searchTerm,
        pageSize,
      })
      prevSearchTerm.current = searchTerm
      isLoading.current = true
    } else {
      isLoading.current = false
    }
  }, [searchTerm, pageSize, fetchFollower, userName])

  useEffect(() => {
    return () => {
      observer.current?.disconnect()
    }
  }, [])

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && users.length > 0 && paginationInfo.nextCoursor) {
            fetchFollower({
              userName,
              search: searchTerm,
              cursor: paginationInfo.nextCoursor,
              pageSize,
            })
            isLoading.current = false
          }
        },
        { rootMargin: '100px' }
      )

      if (node) observer.current.observe(node)
    },
    [isFetching, paginationInfo.nextCoursor, fetchFollower]
  )

  return {
    users,
    lastElementRef,
    isFetching,
    isError,
    isLoading: isLoading.current,
    nextCursor: paginationInfo.nextCoursor,
    updateQuery,
  }
}
