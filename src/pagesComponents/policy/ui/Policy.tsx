import s from './Policy.module.scss'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { ArrowBackOutlineIcon } from '@/shared/assets/icons/ArrowBackOutlineIcon'
import { Typography } from '@/shared/ui/typography'
import { ComponentProps } from 'react'

type Policy = {
  className?: string
  policyHeader: string
  policyText?: React.ReactNode
} & ComponentProps<'section'>
export const Policy = ({ policyHeader, policyText, ...props }: Policy) => {
  return (
    <section className={s.policy} {...props}>
      <div className={s.policy_header}>
        <Button variant={'text'} asChild={true}>
          <Link href={'/singup'}>
            <ArrowBackOutlineIcon /> <span> Back to Sign Up </span>
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
