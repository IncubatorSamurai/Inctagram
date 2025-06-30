import PublicPosts from '@/features/publicPosts/ui/PublicPosts/PublicPosts'
import { getMeData } from '@/shared/utils/getMeData'
import { redirect } from 'next/navigation'
import { PATH } from '@/shared/config/routes'

export default async function Page() {
  const me = await getMeData()

  if (me) {
    redirect(PATH.FEED)
  }

  return <PublicPosts />
}
