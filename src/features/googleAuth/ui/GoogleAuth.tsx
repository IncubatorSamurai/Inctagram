'use client'

import { useRouter } from '@/i18n/routing'
import { useGoogleLoginMutation } from '@/shared/api/auth/authApi'
import { GoogleIcon } from '@/shared/assets/icons/GoogleIcon'
import { PATH } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import { useGoogleLogin } from '@react-oauth/google'

import { setIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { useAppDispatch } from '@/shared/hooks'
export const GoogleAuth = () => {
  const route = useRouter()
  const [login] = useGoogleLoginMutation()
  const dispatch = useAppDispatch()
  const googleLogin = useGoogleLogin({
    redirect_uri: 'https://picture-verse.com',
    ux_mode: 'redirect',
    scope: 'email profile',
    onSuccess: async ({ code }) => {
      const response = await login({
        redirectUrl: 'https://picture-verse.com',
        code,
      }).unwrap()
      // fronted url in redirectUrl

      if (response.accessToken) {
        localStorage.setItem('access_token', response.accessToken)
        localStorage.setItem('email', response.email)
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        route.push(PATH.HOME)
      }
    },
    onError: error => {
      console.error('Google login error', error)
    },
    flow: 'auth-code',
  })

  return (
    <Button variant="icon" onClick={googleLogin}>
      <GoogleIcon width={36} height={36} />
    </Button>
  )
}
