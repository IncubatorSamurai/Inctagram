export async function getPublicData(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/public-user/profile/${userId}`, {
    cache: 'no-store',
  })
  return res.json()
}
