import React, { ComponentProps } from 'react'
import clsx from 'clsx'
import s from './Button.module.scss'
import { Slot } from '@radix-ui/react-slot'

type Props = {
  asChild?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'icon'
  fullWidth?: boolean
} & ComponentProps<'button'>

export const Button = ({ className, fullWidth, variant = 'primary', asChild, ...props }: Props) => {
  const style = clsx(s.button, s[variant], fullWidth && s.fullWidth, className)
  const Component = asChild ? Slot : 'button'
  return <Component {...props} className={style} />
}
