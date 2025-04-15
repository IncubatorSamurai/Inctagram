// import { PostModalGlobal } from '@/entities/postModal'
import { PublicModalAlex } from '@/features/post/PostModal'

export default async function PostModal({ searchParams }: { searchParams: { postId: string } }) {
  const postId = (await searchParams).postId

  return <PublicModalAlex postId={+postId} />
}
