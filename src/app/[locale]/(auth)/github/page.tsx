'use client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/routing'
import { useEffect } from 'react'

export default function GitHub() {
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const accessToken = params.get('accessToken')
    const email = params.get('email')
    if (accessToken && email) {
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('email', email)
    }
    router.push('/')
  }, [params, router])

  return <div>Github</div>
}
