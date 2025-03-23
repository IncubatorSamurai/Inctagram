import { ProfilePage } from '@/entities/profile/ui/Profile'

async function getPublicData(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/public-user/profile/${userId}`, {
    cache: 'no-store',
  })
  return res.json()
}

async function getMeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/auth/me`, {
    cache: 'no-store',
  })
  return res.json()
}

type Props = {
  params: Promise<{ userId: string }>
}

export default async function UserProfile({ params }: Props) {
  const userId = (await params).userId
  const [resPublicData, resMeData] = await Promise.all([getPublicData(userId), getMeData()])
  return <ProfilePage resMeData={resMeData} resPublicData={resPublicData} />
}
