'use client'
import s from './layout.module.scss'
import { Sidebar } from '@/widgets/sidebar'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={s.layout_container}>
      <Sidebar />
      {children}
    </div>
  )
}
