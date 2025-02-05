import s from './Typography.module.scss'
import { ComponentProps } from 'react'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { VariantType } from '@/shared/ui/typography/Typography.stories'

type Props = {
  asChild?: boolean
  className?: string
  variant?: VariantType
} & ComponentProps<'p'>

export const Typography = ({
  asChild,
  className,
  variant = 'regular_text_14',
  ...props
}: Props) => {
  const Comp = asChild ? Slot : 'p'
  const Style = clsx(s[variant], className)

  return <Comp className={Style} {...props}></Comp>
}
