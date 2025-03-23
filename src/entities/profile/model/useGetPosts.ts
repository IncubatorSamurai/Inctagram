import {
  useGetPostsByUserNameQuery,
  useLazyGetPostsByUserNameQuery,
} from '@/shared/api/post/postApi'
import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver'
import { GetPostsByUserIdRespond, PostModel } from '@/shared/api/post/postApi.types'
import { useParams } from 'next/navigation'
import {
  useGetPublicPostsByUserIdQuery,
  useLazyGetPublicPostsByUserIdQuery,
} from '@/shared/api/post/publicPosts'
import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'

type Props = {
  userName: string
  resPublicPosts?: GetPostsByUserIdRespond
}

export const useGetPosts = ({ userName, resPublicPosts }: Props) => {
  const params = useParams()
  const { userId: id } = params
  const userId = id as string

  const [pageNumber, setPageNumber] = useState(1)
  const [posts, setPosts] = useState<PostModel[]>([])
  const endCursorPostIdRef = useRef<null | string>(null)
  const { isInView, targetRef } = useIntersectionObserver({ threshold: 0.5 })

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const { data: profilePosts } = useGetPostsByUserNameQuery(
    { pageNumber: 1, pageSize: 8, userName },
    { skip: !userName || !isLoggedIn }
  )

  const { data: publicPostsByUserId = resPublicPosts } = useGetPublicPostsByUserIdQuery(
    { pageSize: 8, userId },
    { skip: !!resPublicPosts || pageNumber > 1 }
  )

  useEffect(() => {
    if (profilePosts) {
      setPosts(profilePosts.items)
    } else if (publicPostsByUserId) {
      setPosts(publicPostsByUserId.items)
    }
  }, [profilePosts, publicPostsByUserId])

  useEffect(() => {
    endCursorPostIdRef.current = posts[posts.length - 1]?.id.toString()
  }, [posts])

  const [getNextPosts, { data: nextDataPosts, isFetching, isSuccess }] =
    useLazyGetPostsByUserNameQuery()
  const [
    getNextPublicPosts,
    { data: nextDataPublicPosts, isFetching: isPublicFetching, isSuccess: isPublicSuccess },
  ] = useLazyGetPublicPostsByUserIdQuery()

  useEffect(() => {
    if (isSuccess && nextDataPosts) {
      setPosts(prev => [...prev, ...nextDataPosts.items])
    } else if (isPublicSuccess && nextDataPublicPosts) {
      setPosts(prev => [...prev, ...nextDataPublicPosts.items])
    }
  }, [isPublicSuccess, isSuccess, nextDataPosts, nextDataPublicPosts])

  const totalCount = publicPostsByUserId?.totalCount ?? profilePosts?.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / 8)
  const isSetNextPage = isInView && pageNumber < totalPages

  useEffect(() => {
    if (isSetNextPage && !isFetching && pageNumber <= totalPages && isLoggedIn) {
      setPageNumber(prev => prev + 1)
      getNextPosts({ pageNumber: pageNumber + 1, pageSize: 8, userName })
    }
    if (isSetNextPage && !isPublicFetching && pageNumber <= totalPages && !isLoggedIn) {
      setPageNumber(prev => prev + 1)
      getNextPublicPosts({
        endCursorPostId: endCursorPostIdRef.current ?? undefined,
        pageSize: 8,
        userId,
      })
    }
  }, [isPublicFetching, isSetNextPage, isFetching, getNextPosts, pageNumber, userName, userId])

  return { posts, targetRef }
}
