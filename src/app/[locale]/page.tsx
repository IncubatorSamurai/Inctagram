'use client'
import { useRouter } from '@/i18n/routing'
import { PATH } from '@/shared/config/routes'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.push(PATH.SIGNUP)
  }, [router])

  return <div>Locale</div>
}
