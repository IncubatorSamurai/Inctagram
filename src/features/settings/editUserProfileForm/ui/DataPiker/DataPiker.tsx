import s from './DataPiker.module.scss'
import { Calendar } from '@/shared/ui/datepicker/calendar'
import { PopoverContent, PopoverRoot, PopoverTrigger } from '@/shared/ui/popover'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { format } from 'date-fns'
import { CalendarOutlineIcon } from '@/shared/assets/icons/CalendarOutlineIcon'
import { useState } from 'react'

export const DataPiker = () => {
  const [date, setDate] = useState<Date | undefined>()
  const [isOpen, setIsOpen] = useState(false)

  const selectDate = (e: Date) => {
    setDate(e)
    setIsOpen(false)
  }
  return (
    <PopoverRoot open={isOpen}>
      <PopoverTrigger asChild onClick={() => setIsOpen(prev => !prev)}>
        <Button variant={'icon'} className={s.triggerButton}>
          <Typography variant={'regular_text_16'}>
            {date !== undefined ? format(date, 'dd/MM/yyyy') : '00.00.0000'}
          </Typography>
          <CalendarOutlineIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={s.content}>
        <Calendar mode={'single'} onSelect={e => selectDate(e as Date)} selected={date} />
      </PopoverContent>
    </PopoverRoot>
  )
}
