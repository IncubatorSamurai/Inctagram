'use client'
import s from './layout.module.scss'
import { Sidebar } from '@/widgets/sidebar'
import { useRouter } from '@/i18n/routing'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { PATH } from '@/shared/config/routes'
import { useEffect } from 'react'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(PATH.PUBLIC)
    }
  },[router,isLoggedIn])

  return (
    <div className={s.layout_container}>
      <Sidebar />
      {children}
    </div>
  )
}
