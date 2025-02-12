import React from 'react'
import { PopoverContent, PopoverRoot, PopoverTrigger } from '@/shared/ui/popover'
import { Button } from '@/shared/ui/button'
import { CalendarIcon } from '@/shared/assets/icons/CalendarIcon'
import { Typography } from '@/shared/ui/typography'
import { format } from 'date-fns'
import { Calendar } from '@/shared/ui/datepicker/calendar/Calendar'
import s from './DatePicker.module.scss'

type Props = {
  onChange: (date: string | undefined) => void
  value: Date | undefined
}

export const DatePicker = ({ onChange, value }: Props) => {
  const selectDateHandler = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, 'dd/MM/yyyy'))
    }
  }

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button variant={'icon'} className={s.triggerButton}>
          <Typography variant={'regular_text_16'}>
            {value !== undefined ? format(value, 'dd/MM/yyyy') : 'Pick a date'}
          </Typography>
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar mode={'single'} onSelect={selectDateHandler} selected={value} />
      </PopoverContent>
    </PopoverRoot>
  )
}
