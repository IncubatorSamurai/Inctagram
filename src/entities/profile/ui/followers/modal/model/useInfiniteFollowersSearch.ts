import { useLazyGetFollowersQuery } from '@/shared/api/users/usersApi'
import { useCallback, useEffect, useRef } from 'react'

const PAGE_SIZE = 12

type Props = {
  searchTerm: string
  pageSize?: number
  userName: string
}

export const useInfiniteFollowerSearch = ({
  searchTerm,
  userName,
  pageSize = PAGE_SIZE,
}: Props) => {
  const prevSearchTerm = useRef('')
  const prevUserName = useRef('')
  const observer = useRef<IntersectionObserver | null>(null)
  const isLoading = useRef(false)

  const [fetchFollower, { data, isFetching, isError }] = useLazyGetFollowersQuery()

  const users = data?.items || []
  const paginationInfo = {
    currentPage: data?.page || 0,
    hasNextPage: (data?.page || 0) < (data?.pagesCount || 0),
  }

  useEffect(() => {
    if (prevUserName.current !== userName) {
      prevUserName.current = userName
      prevSearchTerm.current = ''
    }

    if (prevSearchTerm.current !== searchTerm || !searchTerm) {
      fetchFollower({
        userName,
        search: searchTerm,
        pageNumber: 1,
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
          if (entries[0].isIntersecting && users.length > 0 && paginationInfo.hasNextPage) {
            fetchFollower({
              userName,
              search: searchTerm,
              pageNumber: paginationInfo.currentPage + 1,
              pageSize,
            })
            isLoading.current = false
          }
        },
        { rootMargin: '100px' }
      )

      if (node) observer.current.observe(node)
    },
    [
      isFetching,
      paginationInfo.hasNextPage,
      fetchFollower,
      userName,
      searchTerm,
      pageSize,
      users.length,
    ]
  )

  return {
    users,
    lastElementRef,
    isFetching,
    isError,
    isLoading: isLoading.current,
    hasNextPage: paginationInfo.hasNextPage,
  }
}
