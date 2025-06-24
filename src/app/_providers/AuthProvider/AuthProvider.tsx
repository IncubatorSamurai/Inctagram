'use client'
import React, { useEffect } from 'react'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useAppDispatch } from '@/shared/hooks'
import { setIsLoggedIn } from '@/shared/store'
import { Loader } from '@/shared/ui/loader'
import s from './AuthProvider.module.scss'

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { data, isFetching } = useMeQuery()
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

  if (isFetching) {
    return (
      <div className={s.container}>
        <Loader />
      </div>
    )
  }

  return <div>{children}</div>
}
