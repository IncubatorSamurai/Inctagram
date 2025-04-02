import getPublicPosts from '@/shared/api/post/serverRequests/getPublicPosts'
import s from './PublicPosts.module.scss'
import { CountRegisteredUsers } from '@/features/publicPosts/ui/CounterRegisteredUsers/CountRegisteredUsers'
import { PublicPostsList } from '@/features/publicPosts/ui/PublicPostsList/PublicPostsList'

const PublicPosts = async () => {

  const { items, totalUsers } = await getPublicPosts({
    pageSize:4,
    sortBy: "createdAt",
    sortDirection: 'desc',

  })

  return (
    <div className={s.public_page}>
      <CountRegisteredUsers totalUsers={totalUsers} />
      <PublicPostsList items={items} />
    </div>
  )
}
export default PublicPosts