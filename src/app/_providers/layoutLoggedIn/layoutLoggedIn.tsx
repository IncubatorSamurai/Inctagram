'use client'
import { Scrollbar } from '@/shared/ui/scrollbar/Scrollbar'
import s from './layout.module.scss'
import { Sidebar } from '@/widgets/sidebar'
import React from 'react'
import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store'

export default function LayoutLoggedIn({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <div className={s.layout_container}>
      {isLoggedIn && <Sidebar />}
      <Scrollbar type={'auto'} className={s.layout_scroll}>
        {children}
      </Scrollbar>
    </div>
  )
}
