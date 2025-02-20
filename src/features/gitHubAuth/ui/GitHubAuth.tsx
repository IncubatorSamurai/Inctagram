import Link from 'next/link'
import { GitHubIcon } from '@/shared/assets/icons/GitHubIcon'

export const GitHubAuth = () => {
  return (
    <Link href="#">
      <GitHubIcon width={36} height={36} color="var(--color-light-100)" />
    </Link>
  )
}
