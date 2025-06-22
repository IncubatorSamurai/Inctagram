export async function getMeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/auth/me`, {
    cache: 'no-store',
  })
  return res.json()
}
