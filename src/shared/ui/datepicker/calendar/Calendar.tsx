import React, { ComponentProps } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import s from './Calendar.module.scss'
import clsx from 'clsx'

export type CalendarProps = ComponentProps<typeof DayPicker>

export const Calendar = ({ classNames, className, ...props }: CalendarProps) => {
  return (
    <>
      <DayPicker className={clsx(s.Calendar, className)} classNames={classNames} {...props} />
    </>
  )
}

Calendar.displayName = 'Calendar'
