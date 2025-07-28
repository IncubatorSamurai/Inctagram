import { ReactNode } from 'react'

export default function Layout({
  children,
  postModal,
}: Readonly<{
  children: ReactNode
  postModal: ReactNode
}>) {
  return (
    <>
      {children}
      {postModal}
    </>
  )
}
