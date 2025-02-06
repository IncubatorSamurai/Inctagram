import * as Radio from '@radix-ui/react-radio-group'
import s from './RadioGroups.module.scss'
import { Typography } from '../typography'
import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

type Options = {
  value: string | string
  label: string
  id: string
}
export type RadioProps = {
  className?: string
  options: Options[]
} & ComponentPropsWithoutRef<typeof Radio.Root>

export const RadioGroups = (props: RadioProps) => {
  const { options, className, ...rest } = props
  return (
    <Radio.Root className={clsx(s.root, className)} {...rest}>
      {options.map(radio => (
        <div key={radio.id} className={s.container}>
          <Radio.Item className={s.item} value={radio.value} id={radio.id}>
            <Radio.Indicator className={s.indicator} />
          </Radio.Item>
          <label htmlFor={radio.id} className={clsx(s.label)}>
            <Typography variant="regular_text_14">{radio.label}</Typography>
          </label>
        </div>
      ))}
    </Radio.Root>
  )
}
