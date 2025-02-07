import * as SelectRadix from '@radix-ui/react-select'
import s from '../Select.module.scss'
import { clsx } from 'clsx'
import React, { ComponentPropsWithoutRef, ElementRef } from 'react'

type ItemProps = ComponentPropsWithoutRef<typeof SelectRadix.Item>

export const SelectItem = React.forwardRef<ElementRef<typeof SelectRadix.Item>, ItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectRadix.Item className={clsx(s.selectItem, className)} {...props} ref={forwardedRef}>
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
        <SelectRadix.ItemIndicator className={s.ItemIndicator}>
          {/*<CheckIcon />*/}
        </SelectRadix.ItemIndicator>
      </SelectRadix.Item>
    )
  }
)
