'use client'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/shared/store'
import { useRouter } from '@/i18n/routing'
import { PATH } from '@/shared/config/routes'

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(PATH.SIGNIN)
    }
  }, [])

  return <>{children}</>
}
