export async function getPublicPosts(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}v1/public-posts/user/${userId}/,?pageSize=8`,
    {
      cache: 'no-store',
    }
  )
  return res.json()
}
