'use client'
import React, { useEffect } from 'react'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn, setIsLoggedIn } from '@/shared/store'

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { data, refetch } = useMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (data?.email) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      localStorage.setItem('email', data.email)
      localStorage.setItem('userName', data.userName || '')
      localStorage.setItem('userId', String(data.userId))
    }
  }, [dispatch, data])

  useEffect(() => {
    if (isLoggedIn) {
      refetch()
    }
  }, [isLoggedIn, refetch])

  return <div>{children}</div>
}
