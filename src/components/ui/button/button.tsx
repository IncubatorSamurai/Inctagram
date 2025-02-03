import React, { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import s from './button.module.scss'
import { Slot } from '@radix-ui/react-slot'

type Props = {
  asChild?: boolean
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
} & ComponentPropsWithoutRef<'button'>

export function Button({ className, fullWidth, variant = 'primary', asChild, ...props }: Props) {
  const style = clsx(s.button, s[variant], fullWidth && s.fullWidth, className)
  const Component = asChild ? Slot : 'button'
  return <Component {...props} className={style} />
}
