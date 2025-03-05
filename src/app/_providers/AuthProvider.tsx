'use client'
import React, { PropsWithChildren, useEffect } from 'react'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn, setIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import clsx from 'clsx'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data } = useMeQuery()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  useEffect(() => {
    if (data?.email) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      localStorage.setItem('email', data.email)
    }
  }, [dispatch, data])

  return <div className={clsx("layout_container", { "layout_container_loggedOut": !isLoggedIn })}>{children}</div>
}
