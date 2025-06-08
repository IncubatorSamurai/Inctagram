import { useLazyGetUsersQuery } from '@/shared/api/users/usersApi'
import { useCallback, useEffect, useRef } from 'react'

const PAGE_SIZE = 12

type Props = {
  searchTerm: string
  pageSize?: number
}

export const useInfiniteSearch = ({ searchTerm, pageSize = PAGE_SIZE }: Props) => {
  const prevSearchTerm = useRef('')
  const observer = useRef<IntersectionObserver | null>(null)
  const isLoading = useRef(false)

  const [fetchUsers, { data, isFetching, isError }] = useLazyGetUsersQuery()

  const users = data?.items || []
  const paginationInfo = {
    currentPage: data?.page || 0,
    hasNextPage: (data?.page || 0) < (data?.pagesCount || 0),
  }

  useEffect(() => {
    if (!searchTerm) {
      prevSearchTerm.current = ''
      return
    }

    if (prevSearchTerm.current !== searchTerm) {
      fetchUsers({ search: searchTerm, pageNumber: 1, pageSize })
      prevSearchTerm.current = searchTerm
      isLoading.current = true
    } else {
      isLoading.current = false
    }
  }, [searchTerm, pageSize, fetchUsers])

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
          if (entries[0].isIntersecting && users.length > 0 && paginationInfo.hasNextPage) {
            fetchUsers({ search: searchTerm, pageNumber: paginationInfo.currentPage + 1, pageSize })

            if (isLoading.current) isLoading.current = false
          }
        },
        { rootMargin: '100px' }
      )

      if (node) observer.current.observe(node)
    },
    [isFetching, paginationInfo.hasNextPage, fetchUsers]
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
