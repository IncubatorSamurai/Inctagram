import { PostsModal } from '@/features/post/PostModal'
import getPublicPost from '@/shared/api/post/serverRequests/getPublicPost'
import getComments from '@/shared/api/post/serverRequests/getPostComments'

export default async function PostModal({ searchParams }: { searchParams: { postId: string } }) {
  const resolvedSearchParams = await searchParams
  const postId = resolvedSearchParams?.postId ? Number(resolvedSearchParams.postId) : null
  if (!postId) {
    return
  }

  const post = await getPublicPost({ id: postId })
  const commentsData = await getComments({ id: postId })

  return <PostsModal post={post} commentsData={commentsData} postId={postId} />
}
