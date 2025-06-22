import { getPublicData, getPublicPosts } from '@/shared/utils'
import { Profile } from '@/entities/profile/ui/Profile'
import { getMeData } from '@/shared/utils/getMeData'
import { getPrivateData } from '@/shared/utils/getPrivateData'

type Props = {
  params: Promise<{ userId: string }>
}

export default async function ProfilePage({ params }: Props) {
  const userId = (await params).userId

  let isLoggedIn = false
  let me = null

  try {
    me = await getMeData()

    // 💡 проверяем, что пользователь залогинен (например, по наличию id)
    if (me && me.id) {
      isLoggedIn = true
    }
  } catch (error) {
    // если ошибка — считаем, что пользователь не авторизован
    console.log(error)
    isLoggedIn = false
  }

  let resPublicData = null
  let resPublicPosts = null

  if (!isLoggedIn) {
    ;[resPublicData, resPublicPosts] = await Promise.all([
      getPublicData(userId),
      getPublicPosts(userId),
    ])
  } else {
    // если пользователь залогинен, получаем приватные данные (можно передавать `me.id` или токен)
    ;[resPublicData, resPublicPosts] = await Promise.all([
      getPrivateData(userId),
      getPublicPosts(userId),
    ])
  }
  return <Profile resPublicData={resPublicData} resPublicPosts={resPublicPosts} />
}
