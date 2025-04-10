import { ReactNode } from 'react'

export default function Layout({
  children,
  parts,
}: Readonly<{
  children: ReactNode
  parts: ReactNode
}>) {
  return (
    <>
      {parts}
      {children}
    </>
  )
}
