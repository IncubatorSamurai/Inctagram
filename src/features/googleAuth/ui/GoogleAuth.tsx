import Link from 'next/link'
import { GoogleIcon } from '@/shared/assets/icons/GoogleIcon'

export const GoogleAuth = () => {
  return (
    <Link href="#">
      <GoogleIcon width={36} height={36} />
    </Link>
  )
}
