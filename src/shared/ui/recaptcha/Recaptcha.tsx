import { ComponentPropsWithoutRef, forwardRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import clsx from 'clsx'
import s from './Recaptcha.module.scss'
import { Typography } from '../typography'

type Props = { error?: string } & Omit<ComponentPropsWithoutRef<typeof ReCAPTCHA>, 'sitekey'>

export const Recaptcha = forwardRef<ReCAPTCHA, Props>(({ error, ...rest }, ref) => {
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY

  if (!sitekey) return null

  return (
    <div className={clsx(s.container, error && s.errorContainer)}>
      <ReCAPTCHA ref={ref} sitekey={sitekey} theme="dark" {...rest} />
      {error && (
        <Typography variant="error" className={clsx(s.errorText)}>
          {error}
        </Typography>
      )}
    </div>
  )
})

Recaptcha.displayName = 'Recaptcha'
