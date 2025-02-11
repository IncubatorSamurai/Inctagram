import * as SelectRadix from '@radix-ui/react-select'
import s from '../Select.module.scss'
import { clsx } from 'clsx'
import React, { ComponentPropsWithoutRef, ElementRef } from 'react'

type ItemProps = ComponentPropsWithoutRef<typeof SelectRadix.Item>

export const SelectItem = React.forwardRef<ElementRef<typeof SelectRadix.Item>, ItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const classNames = {
      selectItem: clsx(s.selectItem, className),
    }
    return (
      <SelectRadix.Item className={s.selectItem} {...props} ref={forwardedRef}>
        <SelectRadix.ItemText className={classNames.selectItem} ref={forwardedRef}>
          {children}
        </SelectRadix.ItemText>
      </SelectRadix.Item>
    )
  }
)

SelectItem.displayName = 'SelectItem'
