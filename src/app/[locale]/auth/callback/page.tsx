'use client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/i18n/routing'
import { useEffect } from 'react'
import { useGoogleLoginMutation } from '@/shared/api/auth/authApi'
import { PATH } from '@/shared/config/routes'
import { useAppDispatch } from '@/shared/hooks'
import { setIsLoggedIn } from '@/shared/store'

export default function Callback() {
  const [login] = useGoogleLoginMutation()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const params = useSearchParams()
  const code = params.get('code')

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (!code) {
        console.error('Authorization error: code is empty')
        router.push(PATH.SIGNUP)
        return
      }

      try {
        const response = await login({
          redirectUrl: `${window.location.origin}${process.env.NEXT_PUBLIC_CALLBACK_PATH}`,
          code,
        }).unwrap()

        localStorage.setItem('access_token', response.accessToken)
        localStorage.setItem('email', response.email)

        dispatch(setIsLoggedIn({ isLoggedIn: true }))

        router.push(PATH.HOME)
      } catch (error) {
        console.error('Authorization error: ', error)
        router.push(PATH.SIGNUP)
      }
    }

    handleGoogleLogin()
  }, [code, router, dispatch, login])

  return <div>Loading...</div>
}
