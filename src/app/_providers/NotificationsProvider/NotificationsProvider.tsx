import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const NotificationsProvider = ({ children }: Props) => {
  return <>{children}</>
}
