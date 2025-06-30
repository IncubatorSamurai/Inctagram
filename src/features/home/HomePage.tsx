'use client'
import { HomePost } from '@/features/home/ui/HomePost/homePost'
import { Scrollbar } from '@/shared/ui/scrollbar'
import s from './homePage.module.scss'
import { useGetHomePosts } from '@/features/home/model'
import { Loader } from '@/shared/ui/loader'

export const HomePage = () => {
  const { posts, lastPostElementRef, isLoading } = useGetHomePosts()

  if (isLoading) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    )
  }

  return (
    <Scrollbar>
      {posts?.map((post, index) => {
        const isLast = index === posts.length - 1
        return (
          <div key={post.id} className={s.container} ref={isLast ? lastPostElementRef : null}>
            <HomePost {...post}></HomePost>
          </div>
        )
      })}
    </Scrollbar>
  )
}
