'use client'
import { Input } from '@/shared/ui/input'
import s from './SignInForm.module.scss'
import { Typography } from '@/shared/ui/typography'
import Link from 'next/link'
import { Button } from '@/shared/ui/button'
import { useState } from 'react'

export const SignInForm = () => {
  return (
    <form>
      <Input className={s.input} label="Email" placeholder="Epam@epam.com" />
      <Input label="Password" placeholder="**********" type="password" />
      <div className={s.box}>
        <Link href={'/forgotpassword'} className={s.link}>
          <Typography className={s.linkTitle}>Forgot Password</Typography>
        </Link>
        <Button fullWidth={true}>Sign In</Button>
      </div>
    </form>
  )
}
