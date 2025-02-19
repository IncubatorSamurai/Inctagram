import * as React from 'react'
import * as SelectRadix from '@radix-ui/react-select'
import { ComponentPropsWithoutRef } from 'react'
import { clsx } from 'clsx'
import s from './Select.module.scss'
import { Typography } from '@/shared/ui/typography'
import { ArrowIosUpIcon } from '@/shared/assets/icons/ArrowIosUpIcon'

type Props = {
  disabled?: boolean
  label?: string
  placeholder?: string
  children?: React.ReactNode


} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const SelectBox = ({ children,label, placeholder, disabled = false, ...props }: Props) => {
  const classNames = {
    selectGroup: clsx(s.selectGroup),
    selectLabel: clsx(s.selectLabel, disabled && s.selectLabelDisabled),
    selectTrigger: clsx(s.selectTrigger),
  }

  return (
    <div className={s.selectWrapper}>
      {label && <Typography className={classNames.selectLabel}>{label}</Typography>}
      <SelectRadix.Root disabled={disabled}  {...props}>
        <SelectRadix.Trigger className={classNames.selectTrigger}>
          <SelectRadix.Value placeholder={placeholder} />
          <ArrowIosUpIcon color={'var(--color-light-100)'} className={s.arrow}></ArrowIosUpIcon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={s.selectContent} position={'popper'}>
            <SelectRadix.Viewport>
              <SelectRadix.Group className={classNames.selectGroup}>
                {children}
              </SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}
