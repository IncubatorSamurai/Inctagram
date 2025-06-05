'use client'
import s from './Policy.module.scss'
import { Button } from '@/shared/ui/button'
import { Link } from '@/i18n/routing'
import { ArrowBackOutlineIcon } from '@/shared/assets/icons/ArrowBackOutlineIcon'
import { Typography } from '@/shared/ui/typography'
import { ComponentProps, useEffect, useState } from 'react'
// import { PATH } from '@/shared/config/routes'

type Policy = {
  className?: string
  policyHeader: string
  policyText?: React.ReactNode
} & ComponentProps<'section'>
export const Policy = ({ policyHeader, policyText, ...props }: Policy) => {
  const [prev, setPrev] = useState<string | null>(null)

  useEffect(() => {
    setPrev(localStorage.getItem('prevPath'))
  }, [])
  console.log(prev)
  return (
    <section className={s.policy} {...props}>
      <div className={s.policy_header}>
        <Button variant={'text'} asChild={true}>
          <Link href={`${prev}`}>
            <ArrowBackOutlineIcon />{' '}
            <span> {prev === '/profile/settings' ? 'Back to Settings' : 'Back to Sing Up'} </span>
          </Link>
        </Button>
        <Typography variant={'h1'} className={s.policy_header_text}>
          {policyHeader}
        </Typography>
      </div>
      <div className={s.policy_content}>
        <div className={s.policy_text}>{policyText}</div>
      </div>
    </section>
  )
}
