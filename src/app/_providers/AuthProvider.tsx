'use client'
import React, { PropsWithChildren, useEffect } from 'react'
import { useMeQuery } from '@/shared/api/auth/authApi'
import { useAppDispatch } from '@/shared/hooks'
import { setIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { useRouter } from '@/i18n/routing'
import { PATH } from '@/shared/config/routes'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data } = useMeQuery()
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (data?.email) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      localStorage.setItem('email', data.email)
      router.push(PATH.HOME)
    }
  }, [dispatch, data])

  return <div>{children}</div>
}
