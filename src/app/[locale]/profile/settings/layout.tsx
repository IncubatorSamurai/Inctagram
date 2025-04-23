import { ReactNode } from 'react'

export default function Layout({
  children,
  parts,
  statusModal,
}: Readonly<{
  children: ReactNode
  parts: ReactNode
  statusModal: ReactNode
}>) {
  return (
    <>
      {children}
      {parts}
      {statusModal}
    </>
  )
}
