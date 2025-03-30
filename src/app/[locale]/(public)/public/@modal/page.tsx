import PublicModalFetcher from '@/features/publicPosts/ui/PublicModal/PublicModalFetcher'

export default async function PublicModalPage({ searchParams }: { searchParams: { postId?: string } }) {
  return <div><PublicModalFetcher searchParams={searchParams} /></div>
}
