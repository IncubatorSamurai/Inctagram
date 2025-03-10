import { LinkExpired, LinkExpiredForm } from '@/features/auth'

export const InvalidEmail = () => {
  return (
    <LinkExpired>
      <LinkExpiredForm />
    </LinkExpired>
  )
}
