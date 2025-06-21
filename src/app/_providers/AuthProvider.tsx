'use client'
import React, { PropsWithChildren, useEffect } from 'react'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useAppDispatch } from '@/shared/hooks'
import { setIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { Loader } from '@/shared/ui/loader'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data, isLoading } = useMeQuery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data?.email) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      localStorage.setItem('email', data.email)
    }
    if (data?.userName) {
      localStorage.setItem('userName', data.userName)
    }
  }, [dispatch, data])

  if (isLoading) {
    return <Loader />
  }

  return <div>{children}</div>
}
