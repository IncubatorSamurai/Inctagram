'use client'
import s from './styles.module.scss'
import { useRouter } from '@/i18n/routing'
import React, { useEffect } from 'react'
import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store'
import { PATH } from '@/shared/config/routes'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(PATH.FEED)
    }
  }, [isLoggedIn, router])

  return <div className={s.container}>{children}</div>
}
