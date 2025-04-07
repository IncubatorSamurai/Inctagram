import { ProfilePage } from '@/entities/profile/ui/Profile'

async function getPublicData(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/public-user/profile/${userId}`, {
    cache: 'no-store',
  })
  return res.json()
}

type PostsProps = {
  userId: string
}

async function getPublicPosts({ userId }: PostsProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}v1/public-posts/user/${userId}/,?pageSize=8`,
    {
      cache: 'no-store',
    }
  )
  return res.json()
}

type Props = {
  params: Promise<{ userId: string }>
}

export default async function UserProfile({ params }: Props) {
  const userId = (await params).userId
  const [resPublicData, resPublicPosts] = await Promise.all([
    getPublicData(userId),
    getPublicPosts({ userId }),
  ])
  return <ProfilePage resPublicData={resPublicData} resPublicPosts={resPublicPosts} />
}
