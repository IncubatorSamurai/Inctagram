import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '@/shared/ui/datepicker/DatePicker'
import { useState } from 'react'
import { PopoverContent, PopoverRoot, PopoverTrigger } from '@/shared/ui/popover'
import { CalendarIcon } from '@/shared/assets/icons/CalendarIcon'
import { format } from 'date-fns'
import { Calendar } from '@/shared/ui/datepicker/calendar/Calendar'
import s from './DatePicker.module.scss'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { DateRange } from 'react-day-picker'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onChange: () => {},
    value: new Date(),
  },
}

const SingleMode = () => {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button variant={'icon'} className={s.triggerButton}>
          <Typography variant={'regular_text_16'}>
            {date !== undefined ? format(date, 'dd/MM/yyyy') : 'Pick a date'}
          </Typography>
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={s.content}>
        <Calendar mode={'single'} onSelect={setDate} selected={date} />
      </PopoverContent>
    </PopoverRoot>
  )
}

export const SingleModeCalendar: Story = {
  args: {
    onChange: () => {},
    value: new Date(),
  },
  render: () => <SingleMode />,
}

const RangeMode = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  })

  const selectDateHandler = (range: DateRange | undefined) => {
    if (!range || !range.from) return

    if (range.to && range.from.getTime() === range.to.getTime()) {
      setDateRange({ from: range.from, to: undefined })
    } else {
      setDateRange(range)
    }
  }

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button variant={'icon'} className={s.triggerButton}>
          <Typography variant={'regular_text_16'}>
            {dateRange?.from
              ? dateRange.to
                ? `${format(dateRange.from, 'dd/MM/yyyy')} - ${format(dateRange.to, 'dd/MM/yyyy')}`
                : `${format(dateRange.from, 'dd/MM/yyyy')}`
              : 'Pick a date'}
          </Typography>
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={s.content}>
        <Calendar mode={'range'} onSelect={selectDateHandler} selected={dateRange} />
      </PopoverContent>
    </PopoverRoot>
  )
}

export const RangeModeCalendar: Story = {
  args: {
    onChange: () => {},
    value: new Date(),
  },
  render: () => <RangeMode />,
}
