import * as ScrollArea from '@radix-ui/react-scroll-area'
import s from './Scrollbar.module.scss'
import { ComponentPropsWithRef, ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  orientation?: 'vertical' | 'horizontal'
  children: ReactNode
  className?: string
} & ComponentPropsWithRef<typeof ScrollArea.Root>

export const Scrollbar = ({ className, orientation = 'vertical', children, ...rest }: Props) => {
  return (
    <ScrollArea.Root className={clsx(s.Root, className)} {...rest}>
      <ScrollArea.Viewport className={clsx(s.viewport)}> {children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={s.scrollbar} orientation={orientation}>
        <ScrollArea.Thumb className={s.thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
