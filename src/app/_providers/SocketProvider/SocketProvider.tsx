'use client'

import { ReactNode, useEffect } from 'react'
import SocketApi from '../../../shared/api/sokets/soket'

type Props = {
  children: ReactNode
}
export const SocketProvider = ({ children }: Props) => {
  const ws = SocketApi.getInstance()
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      ws.connection(token)
    }
  }, [])
  return <>{children}</>
}
