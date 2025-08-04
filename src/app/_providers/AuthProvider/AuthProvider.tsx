'use client'
import React, { useEffect } from 'react'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useAppDispatch } from '@/shared/hooks'
import { setIsLoggedIn } from '@/shared/store'

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { data } = useMeQuery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data?.email) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      localStorage.setItem('email', data.email)
    }
    if (data?.userName) {
      localStorage.setItem('userName', data.userName)
    }
    if (data?.userId) {
      localStorage.setItem('userId', String(data.userId))
    }
  }, [dispatch, data])

  return <div>{children}</div>
}
