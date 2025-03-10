'use client'
import { EyeOffIcon } from '@/shared/assets/icons/EyeOffIcon'
import { EyeOutlineIcon } from '@/shared/assets/icons/EyeOutlineIcon'
import { SearchIcon } from '@/shared/assets/icons/SearchIcon'
import { Typography } from '@/shared/ui/typography'
import clsx from 'clsx'
import { ComponentProps, forwardRef, useState } from 'react'
import s from './Input.module.scss'

type Props = {
  label?: string
  error?: string
  type?: string
} & ComponentProps<'input'>

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const inputStyle = clsx(
      s.input,
      error && s.error,
      s.disabled,
      type === 'search' && s.inputSearch
    )

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(prev => !prev)
    }

    return (
      <div className={clsx(s.inputWrapper, className)}>
        {label && <Typography className={s.label}>{label}</Typography>}
        <div className={s.container}>
          <input
            {...props}
            ref={ref}
            className={inputStyle}
            type={isPasswordVisible ? 'text' : type}
          />
          {type === 'search' && (
            <div className={s.searchIcon}>
              <SearchIcon />
            </div>
          )}
          {type === 'password' && (
            <div className={s.eyeIcon} onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <EyeOutlineIcon /> : <EyeOffIcon />}
            </div>
          )}
        </div>
        {error && <Typography variant="error">{error}</Typography>}
      </div>
    )
  }
)

Input.displayName = 'Input'
