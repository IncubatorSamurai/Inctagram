import { PostsModal } from '@/features/post/PostModal'
import getPublicPost from '@/shared/api/post/serverRequests/getPublicPost'
import getComments from '@/shared/api/post/serverRequests/getPostComments'

type PageProps = {
  searchParams: Promise<{
    postId?: string
  }>
}

export default async function PostModal({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const postId = resolvedSearchParams?.postId ? Number(resolvedSearchParams.postId) : null
  if (!postId) {
    return
  }

  const post = await getPublicPost({ id: postId })
  const commentsData = await getComments({ id: postId })

  return <PostsModal post={post} commentsData={commentsData} postId={postId} />
}
