import { CommentsResponse } from '@/shared/api/post/postApi.types'

type GetPostComments = {
  id: number
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  sortDirection?: 'desc' | 'asc'
}
const getComments = async ({
  id,
  pageSize,
  pageNumber,
  sortBy,
  sortDirection,
}: GetPostComments): Promise<CommentsResponse | null> => {
  const params = new URLSearchParams()

  if (pageSize) params.append('pageSize', pageSize.toString())
  if (pageNumber) params.append('pageNumber', pageNumber.toString())
  if (sortBy) params.append('sortBy', sortBy)
  if (sortDirection) params.append('sortDirection', sortDirection)

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}v1/public-posts/${id}/comments?${params.toString()}`,
      { next: { revalidate: 60 } }
    )

    const data = await response.json()
    console.log('Комментарии загружены:', data)
    return data
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error)
    return null
  }
}
export default getComments
