import * as ScrollArea from '@radix-ui/react-scroll-area'
import s from './Scrollbar.module.scss'
import { ComponentPropsWithRef, ReactNode } from 'react'

type Props = {
  orientation?: 'vertical' | 'horizontal'
  children: ReactNode
} & ComponentPropsWithRef<typeof ScrollArea.Root>

export const Scrollbar = ({ orientation = 'vertical', children, ...rest }: Props) => {
  return (
    <ScrollArea.Root className={s.Root} {...rest}>
      <ScrollArea.Viewport className={s.viewport}> {children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={s.scrollbar} orientation={orientation}>
        <ScrollArea.Thumb className={s.thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
