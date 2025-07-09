import { getPublicData, getPublicPosts } from '@/shared/utils'
import { Profile } from '@/entities/profile/ui/Profile'

type Props = {
  params: Promise<{ userId: string }>
}

export default async function ProfilePage({ params }: Props) {
  const userId = (await params).userId
  const [resPublicData, resPublicPosts] = await Promise.all([
    getPublicData(userId),
    getPublicPosts(userId),
  ])

  return <Profile resPublicData={resPublicData} resPublicPosts={resPublicPosts} />
}
