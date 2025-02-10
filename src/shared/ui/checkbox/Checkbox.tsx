import s from './Checkbox.module.scss'
import clsx from 'clsx'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { Typography } from '../typography'
import { CheckIcon } from './icon/check-icon'
import { ComponentRef, forwardRef, ReactNode } from 'react'
import { VariantType } from '../typography/Typography.stories'

type BaseCheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  id: string
  disabled?: boolean
  className?: string
  label?: ReactNode
  error?: string
  labelForText?: VariantType
}

export type CheckboxProps = BaseCheckboxProps &
  Omit<CheckboxRadix.CheckboxProps, keyof BaseCheckboxProps>

type Ref = ComponentRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<Ref, CheckboxProps>(
  (
    {
      checked,
      className = '',
      disabled = false,
      label,
      id,
      onChange,
      error,
      labelForText = 'medium_text_14',
    },
    ref
  ) => {
    const classNames = {
      container: clsx(s.container, className),
      indicator: s.indicator,
      label: s.label,
      root: clsx(s.root, error && s.error),
      typography: s.typography,
    }

    return (
      <div className={classNames.container}>
        <CheckboxRadix.Root
          ref={ref}
          checked={checked}
          disabled={disabled}
          onCheckedChange={onChange}
          className={classNames.root}
          id={id}
        >
          <CheckboxRadix.Indicator className={classNames.indicator}>
            {checked && <CheckIcon />}
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>

        {label && (
          <Typography variant={labelForText} className={classNames.typography} asChild>
            <label htmlFor={id} className={classNames.label}>
              {label}
            </label>
          </Typography>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
