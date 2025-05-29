'use client'
import { HomePost } from '@/entities/homePost/homePost'
import { useGetPublicationsFollowersQuery } from '@/shared/api/pageHome/pageHomeApi'
import { Scrollbar } from '@/shared/ui/scrollbar'

export const HomePage = () => {
  const { data } = useGetPublicationsFollowersQuery({ pageSize: 10 })
  const posts = data?.items

  return (
    <Scrollbar>
      {posts?.map(post => {
        return (
          <div key={post.id}>
            <HomePost {...post}></HomePost>
          </div>
        )
      })}
    </Scrollbar>
  )
}
