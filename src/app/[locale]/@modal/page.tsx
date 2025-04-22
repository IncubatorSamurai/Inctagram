import getPublicPost from '@/shared/api/post/serverRequests/getPublicPost'
import getComments from '@/shared/api/post/serverRequests/getPostComments'
import { PublicModal } from '@/features/publicPosts/ui/PublicModal'

export default async function PublicModalPage({
  searchParams,
}: {
  searchParams: { postId?: string }
}) {
  const resolvedSearchParams = await searchParams
  const postId = resolvedSearchParams?.postId ? Number(resolvedSearchParams.postId) : null
  if (!postId) {
    return
  }

  const post = await getPublicPost({ id: postId })
  const commentsData = await getComments({ id: postId })

  return (
    <div>
      <PublicModal post={post} commentsData={commentsData} postId={postId} />
    </div>
  )
}
