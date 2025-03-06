import { forwardRef } from 'react'
import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'
import clsx from 'clsx'
import s from './Recaptcha.module.scss'
import { Typography } from '../typography'

type Props = { error?: string } & Partial<ReCAPTCHAProps>

export const Recaptcha = forwardRef<ReCAPTCHA, Props>(({ error, ...rest }, ref) => {
  if (!process.env.NEXT_PUBLIC_RECAPTCHA_KEY) return null

  return (
    <div className={clsx(s.container, error && s.errorContainer)}>
      <ReCAPTCHA ref={ref} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} theme="dark" {...rest} />
      {error && (
        <Typography variant="error" className={clsx(s.errorText)}>
          {error}
        </Typography>
      )}
    </div>
  )
})

Recaptcha.displayName = 'Recaptcha'
