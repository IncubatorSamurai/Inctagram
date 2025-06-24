import { cookies } from 'next/headers'
import { getCookie } from 'cookies-next/server'

export async function getMeData() {
  const token = await getCookie('access_token', { cookies })

  if (!token) return null

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  return res.json()
}
