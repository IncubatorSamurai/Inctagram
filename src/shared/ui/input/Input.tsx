'use client'
import React, { ComponentProps, useRef, useState } from 'react'
import clsx from 'clsx'
import s from './Input.module.scss'

import { Slot } from '@radix-ui/react-slot'
import { EyeIcon, EyeOffIcon, SearchIcon } from '@/shared/ui/input/icon'
import { Typography } from '@/shared/ui/typography' // Добавим иконку закрытого глаза

type Props = {
  asChild?: boolean
  label?: string
  error?: string
  type?: string
} & ComponentProps<'input'>

export const Input = ({ className, label, asChild, error, type = 'text', ...props }: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false) // Состояние видимости пароля
  const inputRef = useRef<HTMLInputElement>(null)

  const style = clsx(s.input, error && s.error, s.disabled, className)
  const Component = asChild ? Slot : 'input'
  const [value, setValue] = useState(props.value || '')

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev)
    inputRef.current?.focus() // Фокусируемся обратно на инпут
  }

  const handleClear = () => {
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div className={s.inputWrapper}>
      {label && <Typography className={s.label}>{label}</Typography>}
      {type === 'search' && (
        <>
          <SearchIcon className={s.searchIcon} />
          {value !== '' && (
            <div className={s.clear} onClick={handleClear}>
              X
            </div>
          )}
        </>
      )}

      <Component
        {...props}
        ref={inputRef}
        className={style}
        type={isPasswordVisible ? 'text' : type}
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      {type === 'password' && (
        <div className={s.eyeIcon} onClick={togglePasswordVisibility}>
          {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
        </div>
      )}

      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  )
}
