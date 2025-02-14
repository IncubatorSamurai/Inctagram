import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'
import s from './Card.module.scss'
import clsx from 'clsx'

export const Card = forwardRef<ComponentRef<'div'>, ComponentPropsWithoutRef<'div'>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={clsx(s.card, className)} {...props} />
  }
)

Card.displayName = 'Card'
