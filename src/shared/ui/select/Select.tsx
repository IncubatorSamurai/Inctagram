import * as React from 'react'
import * as SelectRadix from '@radix-ui/react-select'
import { ComponentPropsWithoutRef } from 'react'
import { clsx } from 'clsx'
import s from './Select.module.scss'

import { Typography } from '@/shared/ui/typography'
import { SelectItem } from './selectItem/SelectItem'

type Props = {
  disabled: boolean
  label?: string
  placeholder?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const SelectBox = ({ label, placeholder, children, disabled = false, ...props }: Props) => {
  const classNames = {
    selectGroup: clsx(s.selectGroup),
    selectLabel: clsx(s.selectLabel, disabled && s.selectLabelDisabled),
    selectTrigger: clsx(s.selectTrigger),
  }
  return (
    <div className={s.selectWrapper}>
      <Typography className={classNames.selectLabel}>{label}</Typography>
      <SelectRadix.Root disabled={disabled} {...props}>
        <SelectRadix.Trigger className={classNames.selectTrigger}>
          <SelectRadix.Value placeholder={placeholder} />
          <SelectRadix.Icon>{/*<ChevronDownIcon />*/}</SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={s.selectContent} position={'popper'}>
            {/*<ChevronUpIcon />*/}
            <SelectRadix.Viewport className={s.viewport}>
              <SelectRadix.Group className={classNames.selectGroup}>
                {/*{children}*/}
                <SelectItem value="apple">
                  <Typography>Apple</Typography>
                </SelectItem>
                <SelectItem value="banana">
                  <Typography>Banana</Typography>
                </SelectItem>
                <SelectItem value="blueberry">
                  <Typography>Blueberry</Typography>
                </SelectItem>
                <SelectItem value="grapes">
                  <Typography>Grapes</Typography>
                </SelectItem>
                <SelectItem value="pineapple">
                  <Typography>Pineapple</Typography>
                </SelectItem>
              </SelectRadix.Group>
            </SelectRadix.Viewport>
            {/* <ChevronDownIcon /> */}
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}
