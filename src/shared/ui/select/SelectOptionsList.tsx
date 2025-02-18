import { FlagUnitedKingdomIcon } from '@/shared/assets/icons/FlagUnitedKingdomIcon'
import { FlagRussiaIcon } from '@/shared/assets/icons/FlagRussiaIcon'
import React from 'react'
import { SelectItem } from './selectItem/SelectItem'
import { Typography } from '@/shared/ui/typography'
import s from './Select.module.scss'

export const optionSelectLanguage = [
  { id: 'en', label: 'English', icon: <FlagUnitedKingdomIcon /> },
  { id: 'ru', label: 'Russian', icon: <FlagRussiaIcon /> },
]
export const DEFAULT_OPTION = optionSelectLanguage[0].id

type Option = {
  id: string
  label?: string
  icon?: React.ReactNode
}
type Options = {
  options: Array<Option>
}

export const SelectOptionsList = ({ options }: Options) => {
  return (
    <>
      {options.map(i => (
        <SelectItem key={i.id} value={i.id}>
          {i.icon && i.icon}
          <Typography className={s.typography}>{i.label}</Typography>
        </SelectItem>
      ))}
    </>
  )
}
