'use client'
import { Scrollbar } from '@/shared/ui/scrollbar/Scrollbar'
import s from './layout.module.scss'
import { Sidebar } from '@/widgets/sidebar'
import { useAppDispatch } from '@/shared/hooks'
import { setIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { useMeQuery } from '@/shared/api/auth/authApi'
import React, { useEffect } from 'react'
import { Loader } from '@/shared/ui/loader'

export default function LayoutLoggedIn({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data, isLoading } = useMeQuery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data?.email) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      localStorage.setItem('email', data.email)
    }
    if (data?.userName) {
      localStorage.setItem('userName', data.userName)
    }
  }, [dispatch, data])

  if (isLoading) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={s.layout_container}>
      {data?.userId && <Sidebar userId={data.userId} />}
      <Scrollbar type={'auto'} className={s.layout_scroll}>
        {children}
      </Scrollbar>
    </div>
  )
}
