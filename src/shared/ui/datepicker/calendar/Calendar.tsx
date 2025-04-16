import React, { ComponentProps } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import s from './Calendar.module.scss'
import clsx from 'clsx'
import { ru, enUS } from 'date-fns/locale'
import { useLocale } from 'next-intl'

export type CalendarProps = ComponentProps<typeof DayPicker>

export const Calendar = ({ classNames, className, ...props }: CalendarProps) => {
  const locale = useLocale()

  const modifiers = {
    weekend: (date: Date) => {
      const day = date.getDay()

      return day === 0 || day === 6
    },
  }

  return (
    <>
      <DayPicker
        className={clsx(s.Calendar, className)}
        classNames={{
          button_next: s.button_next,
          button_previous: s.button_prev,
          caption: s.caption,
          caption_label: s.caption_label,
          day: s.day,
          day_button: s.day_button,
          day_disabled: s.day_disabled,
          day_hidden: s.day_hidden,
          day_outside: s.day_outside,
          today: s.day_today,
          week: s.week,
          weekday: s.weekday,
          month_caption: s.month_caption,
          month_grid: s.month_grid,
          row: s.row,
          selected: s.day_selected,
          years_dropdown: s.years_dropdown,
          range_end: s.day_range_end,
          range_middle: s.day_range_middle,
          range_start: s.day_range_start,
          ...classNames,
        }}
        showOutsideDays
        locale={locale === 'ru' ? ru : enUS}
        modifiers={modifiers}
        modifiersClassNames={{
          weekend: s.weekend,
        }}
        captionLayout={'dropdown-years'}
        {...props}
      />
    </>
  )
}

Calendar.displayName = 'Calendar'
