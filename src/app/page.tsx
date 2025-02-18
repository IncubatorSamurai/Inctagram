'use client'
import { Header } from '@/widgets/header'

import { Sidebar } from '@/widgets/sidebar/Sidebar'

export default function BaseHome() {
  return (
      <>
        <Header headerTitle={'Inctagram'} isAuth={true} isAdmin={true} />
        <div style={{ display: 'flex ', alignItems: 'flex-start' }}>
          <Sidebar isAdmin={false} />
        </div>
      </>
  )
}
