import { useLazyGetFollowingByUserNameQuery, usersApi } from '@/shared/api/users/usersApi'
import { useCallback, useEffect, useRef } from 'react'
import { UpdateFollowingThunk } from '@/shared/types'

const PAGE_SIZE = 12

type Props = {
  searchTerm: string
  userName: string
  pageSize?: number
}

export const useInfiniteFollowingSearch = ({
  userName,
  searchTerm,
  pageSize = PAGE_SIZE,
}: Props) => {
  const prevSearchTerm = useRef('')
  const observer = useRef<IntersectionObserver | null>(null)
  const isLoading = useRef(false)

  const [fetchFollowing, { data, isFetching, isError }] = useLazyGetFollowingByUserNameQuery()

  const followingUsers = data?.items || []
  const paginationInfo = {
    currentPage: data?.page || 0,
    hasNextPage: (data?.page || 0) < (data?.pagesCount || 0),
  }

  const updateQuery = ({
    userId,
    isFollowing,
  }: {
    userId: number
    isFollowing: boolean
  }): UpdateFollowingThunk => {
    return usersApi.util.updateQueryData(
      'getFollowingByUserName',
      { userName, search: searchTerm, pageSize },
      draft => {
        const user = draft.items.find(item => item.userId === userId)
        if (user) {
          user.isFollowing = isFollowing
        }
        draft.totalCount += isFollowing ? 1 : -1
      }
    )
  }

  useEffect(() => {
    if (!searchTerm) {
      if (!userName) return
      fetchFollowing({ userName, pageNumber: 1, pageSize })
      prevSearchTerm.current = ''
      return
    }

    if (prevSearchTerm.current !== searchTerm) {
      fetchFollowing({ userName, search: searchTerm, pageNumber: 1, pageSize })
      prevSearchTerm.current = searchTerm
      isLoading.current = true
    } else {
      isLoading.current = false
    }
  }, [searchTerm, pageSize, fetchFollowing, userName])

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        entries => {
          if (
            entries[0].isIntersecting &&
            followingUsers.length > 0 &&
            paginationInfo.hasNextPage
          ) {
            fetchFollowing({
              userName,
              search: searchTerm,
              pageNumber: paginationInfo.currentPage + 1,
              pageSize,
            })

            if (isLoading.current) isLoading.current = false
          }
        },
        { rootMargin: '100px' }
      )

      if (node) observer.current.observe(node)
    },
    [isFetching, paginationInfo.hasNextPage, fetchFollowing]
  )

  return {
    followingUsers,
    lastElementRef,
    isFetching,
    isError,
    updateQuery,
    isLoading: isLoading.current,
    hasNextPage: paginationInfo.hasNextPage,
  }
}
