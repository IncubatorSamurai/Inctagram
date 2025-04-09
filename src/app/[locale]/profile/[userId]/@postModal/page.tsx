import { PostModalGlobal } from '@/entities/postModal'

export default async function PostModal({ searchParams }: { searchParams: { postId: string } }) {
  const postId = (await searchParams).postId

  return <PostModalGlobal postId={postId} />
}
