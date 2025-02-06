import React, { ChangeEvent, ComponentPropsWithoutRef, forwardRef } from 'react'
import { Typography } from '@/shared/ui/typography'
import s from './TextArea.module.scss'
import clsx from 'clsx'

type Props = {
  error?: string
  id?: string
  title?: string
  onValueChange?: (value: string) => void
  className?: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ id, error, title, className, onValueChange, onChange, ...props }, ref) => {
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onValueChange?.(e.target.value)
      onChange?.(e)
    }
    const textAreaStyle = clsx(s.textarea, className, error && s.textAreaError)

    return (
      <div className={s.container}>
        {title && <Typography className={s.title}>{title}</Typography>}
        <textarea
          className={textAreaStyle}
          onChange={onChangeHandler}
          ref={ref}
          id={id}
          {...props}
        ></textarea>
        {error && <Typography variant={'error'}>{error}</Typography>}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
