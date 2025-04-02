'use client'
import { Scrollbar } from '@/shared/ui/scrollbar/Scrollbar'
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
      <Scrollbar type={'auto'} className={s.layout_scroll}>
        {children}
      </Scrollbar>
    </div>
  )
}
