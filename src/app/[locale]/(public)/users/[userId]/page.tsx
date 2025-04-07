import { ProfilePage } from '@/entities/profile/ui/Profile'
import { getPublicData, getPublicPosts } from '@/shared/utils'

type Props = {
  params: Promise<{ userId: string }>
}

export default async function UserProfile({ params }: Props) {
  const userId = (await params).userId
  const [resPublicData, resPublicPosts] = await Promise.all([
    getPublicData(userId),
    getPublicPosts(userId),
  ])
  return <ProfilePage resPublicData={resPublicData} resPublicPosts={resPublicPosts} />
}
