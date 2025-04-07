import getPublicPost from '@/shared/api/post/serverRequests/getPublicPost'
import getComments from '@/shared/api/post/serverRequests/getPostComments'
import { PublicModal } from '@/features/publicPosts/ui/PublicModal'

export default async function PublicModalFetcher({
  searchParams,
}: { searchParams: { postId?: string } }) {
  const postId = (await searchParams?.postId) ? Number(searchParams.postId) : null
  if (!postId) {
    return
  }

  const post = await getPublicPost({ id: postId })
  const commentsData = await getComments({ id: postId })

  const items = commentsData?.items || []
  const { images, avatarOwner, userName, likesCount, createdAt, avatarWhoLikes } = post
  return (
    <div>
      <PublicModal
        avatarWhoLikes={avatarWhoLikes}
        createdAt={createdAt}
        likesCount={likesCount}
        userName={userName}
        images={images}
        comments={items}
        avatarOwner={avatarOwner}
        postId={postId}
      />
    </div>
  )
}
