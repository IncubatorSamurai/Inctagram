import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'
import s from './Recaptcha.module.scss'
import clsx from 'clsx'
import { Typography } from '../typography'

type Props = { error?: string } & Partial<ReCAPTCHAProps>

export const Recaptcha = ({ error, ...rest }: Props) => {
  if (!process.env.NEXT_PUBLIC_RECAPTCHA_KEY) return
  return (
    <form className={clsx(s.container, error && s.errorContainer)}>
      <ReCAPTCHA {...rest} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} theme="dark" />
      {error && (
        <Typography variant="error" className={clsx(s.errorText)}>
          {error}
        </Typography>
      )}
    </form>
  )
}
