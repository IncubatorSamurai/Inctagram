import { Post } from '@/shared/api/post/postApi.types'

type GetPublicPost = {
  id: number
}

const getPublicPost = async ({ id }: GetPublicPost): Promise<Post> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/public-posts/${id}`)

  if (!response.ok) {
    console.error('Failed to fetch posts:', response.status)
  }

  return await response.json()
}
export default getPublicPost
