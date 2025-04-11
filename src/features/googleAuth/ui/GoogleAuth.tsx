'use client'

import { GoogleIcon } from '@/shared/assets/icons/GoogleIcon'
import { Button } from '@/shared/ui/button'

export const GoogleAuth = () => {
  const handlerGoogleAuth = () => {
    const clientId = `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`
    const redirectUri = encodeURIComponent(
      `${window.location.origin}${process.env.NEXT_PUBLIC_CALLBACK_PATH}`
    )
    const responseType = 'code'
    const scope = 'email profile'

    window.location.assign(
      `${process.env.NEXT_PUBLIC_GOOGLE_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`
    )
  }

  return (
    <Button variant="icon" onClick={handlerGoogleAuth}>
      <GoogleIcon width={36} height={36} />
    </Button>
  )
}
