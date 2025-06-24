import { ReactNode } from 'react'
import { getMeData } from '@/shared/utils/getMeData'
import { redirect } from 'next/navigation'
import { PATH } from '@/shared/config/routes'

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const me = await getMeData()

  if (!me) {
    redirect(PATH.SIGNIN)
  }

  return <>{children}</>
}
