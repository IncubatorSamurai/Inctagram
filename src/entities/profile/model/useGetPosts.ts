import {
  useGetPostsByUserNameQuery,
  useLazyGetPostsByUserNameQuery,
} from '@/shared/api/post/postApi'
import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver'
import { PostModel } from '@/shared/api/post/postApi.types'

type Props = {
  userName: string
}

export const useGetPosts = ({ userName }: Props) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [posts, setPosts] = useState<PostModel[]>([])
  const { isInView, targetRef } = useIntersectionObserver({ threshold: 0.5 })

  const { data: profilePosts } = useGetPostsByUserNameQuery(
    { pageNumber: 1, pageSize: 8, userName },
    { skip: !userName }
  )

  useEffect(() => {
    if (profilePosts) {
      setPosts(profilePosts.items)
    }
  }, [profilePosts])

  const [getNextPosts, { data: nextDataPosts, isFetching, isSuccess }] =
    useLazyGetPostsByUserNameQuery()

  useEffect(() => {
    if (isSuccess && nextDataPosts) {
      setPosts(prev => [...prev, ...nextDataPosts.items])
    }
  }, [isSuccess, nextDataPosts])

  const totalCount = profilePosts?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / 8)
  const isSetNextPage = isInView && pageNumber < totalPages

  useEffect(() => {
    if (isSetNextPage && !isFetching && pageNumber <= totalPages) {
      setPageNumber(prev => prev + 1)
      getNextPosts({ pageNumber: pageNumber + 1, pageSize: 8, userName })
    }
  }, [isSetNextPage, isFetching, getNextPosts, pageNumber, userName])

  return { posts, targetRef }
}
