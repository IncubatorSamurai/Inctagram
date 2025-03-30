import { PublicPostsResponse } from '@/shared/api/post/postApi.types'
import { notFound } from 'next/navigation'

type GetPublicPosts = {
  pageSize?: number
  sortBy?: string
  sortDirection?: 'desc' | 'asc'
  endCursorPostId?: number | undefined
}
const getPublicPosts = async ({pageSize, sortBy, sortDirection, endCursorPostId = undefined}:GetPublicPosts): Promise<PublicPostsResponse> => {


  const params = new URLSearchParams()

  if (pageSize) params.append('pageSize', pageSize.toString())
  if (sortBy) params.append('sortBy', sortBy)
  if (sortDirection) params.append('sortDirection', sortDirection)
  if (endCursorPostId !== undefined) {
    params.append('endCursorPostId', endCursorPostId.toString())
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}v1/public-posts/all?${params.toString()}`,
    {
      next: { revalidate: 60 },
    }
  )

  if (!response) {
    notFound()
  }
  return await response.json()
}
export default getPublicPosts
