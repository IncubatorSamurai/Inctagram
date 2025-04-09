import { PostModalGlobal } from '@/entities/postModal/PostModalGlobal'

type Props = {
  params: Promise<{ postId: string }>
}

export default async function PostModalPage({ params }: Props) {
  const postId = (await params).postId

  return <PostModalGlobal postId={postId} />
}
