export async function getPrivateData(userName: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/users/${userName}`, {
    cache: 'no-store',
  })
  return res.json()
}
