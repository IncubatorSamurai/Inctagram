import React, { useState } from 'react'
import { PopoverContent, PopoverRoot, PopoverTrigger } from '@/shared/ui/popover'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { format } from 'date-fns'
import s from './DatePicker.module.scss'
import clsx from 'clsx'
import { CalendarOutlineIcon } from '@/shared/assets/icons/CalendarOutlineIcon'
import { CalendarIcon } from '@/shared/assets/icons/CalendarIcon'
import { Calendar } from '@/shared/ui/datepicker/calendar'

type Props = {
  onChange: (date: string | undefined) => void
  value: Date | undefined
  error?: string
  title?: string
  disabled?: boolean
}

export const DatePicker = ({ onChange, value, error, title, disabled }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const classNames = {
    triggerButton: clsx(s.triggerButton, error && s.errorTriggerButton),
    title: clsx(s.title, disabled && s.disabledTitle),
  }

  const selectDateHandler = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, 'dd/MM/yyyy'))
    }
  }

  return (
    <PopoverRoot open={isOpen} onOpenChange={setIsOpen}>
      {title && <Typography className={classNames.title}>{title}</Typography>}
      <PopoverTrigger asChild className={classNames.triggerButton} disabled={disabled}>
        <Button variant={'icon'}>
          <Typography variant={'regular_text_16'} className={s.triggerText}>
            {value !== undefined ? format(value, 'dd/MM/yyyy') : 'Pick a date'}
          </Typography>
          {isOpen ? (
            <CalendarIcon className={s.icon} />
          ) : (
            <CalendarOutlineIcon className={s.icon} />
          )}
        </Button>
      </PopoverTrigger>
      {error && <Typography variant={'error'}>{error}</Typography>}
      <PopoverContent>
        <Calendar mode={'single'} onSelect={selectDateHandler} selected={value} />
      </PopoverContent>
    </PopoverRoot>
  )
}
