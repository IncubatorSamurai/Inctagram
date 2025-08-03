'use client'

import { ReactNode, useEffect } from 'react'
import SocketApi from '../../../shared/api/sokets/soket'
import { useMeQuery } from '@/shared/api/auth/authApi'

type Props = {
  children: ReactNode
}
export const SocketProvider = ({ children }: Props) => {
  const ws = SocketApi.getInstance()
  const { data: meData } = useMeQuery()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      ws.connection(token)
    }
  }, [meData, ws])
  return <>{children}</>
}
