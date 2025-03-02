import { GoogleOAuthProvider } from '@react-oauth/google'
import { PropsWithChildren } from 'react'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
      {children}
    </GoogleOAuthProvider>
  )
}
