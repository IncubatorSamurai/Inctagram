import { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import s from './Alert.module.scss'

type Props = {
  variant?: 'error' | 'success'
  handleClick?: () => void
  fullWidth?: boolean
  buttonClose?: boolean
} & ComponentPropsWithoutRef<'div'>

export const Alert = ({
  variant = 'success',
  handleClick,
  fullWidth,
  children,
  buttonClose,
  ...rest
}: Props) => {
  const isError = variant === 'error'

  return (
    <div className={clsx(s.container, isError && s.error, fullWidth && s.fullWidth)} {...rest}>
      {children}
      {buttonClose && <button className={clsx(s.close)} onClick={handleClick}></button>}
    </div>
  )
}
