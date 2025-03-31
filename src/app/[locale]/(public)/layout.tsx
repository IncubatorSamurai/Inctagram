'use client'
import { Scrollbar } from '@/shared/ui/scrollbar/Scrollbar'
import s from './layout.module.scss'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={s.layout_container}>
      <Scrollbar type={'auto'} className={s.layout_scroll}>
        {children}
      </Scrollbar>
    </div>
  )
}
