import React, { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'
import * as PopoverRadix from '@radix-ui/react-popover'

type PropsContent = ComponentRef<typeof PopoverRadix.Content>
type PropsContentWithoutRef = ComponentPropsWithoutRef<typeof PopoverRadix.Content>

const PopoverRoot = PopoverRadix.Root

const PopoverTrigger = PopoverRadix.Trigger

const PopoverContent = forwardRef<PropsContent, PropsContentWithoutRef>(
  ({ className, ...props }, ref) => {
    return (
      <PopoverRadix.Portal>
        <PopoverRadix.Content className={className} ref={ref} {...props} />
      </PopoverRadix.Portal>
    )
  }
)

PopoverContent.displayName = PopoverRadix.Content.displayName
PopoverRoot.displayName = PopoverRadix.Root.displayName
PopoverTrigger.displayName = PopoverRadix.Trigger.displayName

export { PopoverRoot, PopoverTrigger, PopoverContent }
