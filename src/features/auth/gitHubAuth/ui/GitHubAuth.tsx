import Link from 'next/link'
import s from './GitHubAuth.module.scss'
import { GitHubIcon } from '@/shared/assets/icons/GitHubIcon'

export const GitHubAuth = () => {
  return (
    <Link href="#">
      <GitHubIcon className={s.github} />
    </Link>
  )
}
