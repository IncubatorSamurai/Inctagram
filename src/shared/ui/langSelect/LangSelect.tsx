import React from 'react'
import { SelectBox } from '@/shared/ui/select'
import { usePathname, useRouter } from '@/i18n/routing'
import { SelectOptionsList } from '@/shared/ui/select/SelectOptionsList'
import { FlagRussiaIcon } from '@/shared/assets/icons/FlagRussiaIcon'
import { FlagUnitedKingdomIcon } from '@/shared/assets/icons/FlagUnitedKingdomIcon'
import { useParams } from 'next/navigation'

export const LangSelect = () => {
  const { locale } = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const changeLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale }) // Меняем локаль без перезагрузки
  }

  const optionSelectLanguage = [
    { id: 'ru', label: 'Russian', icon: <FlagRussiaIcon /> },
    { id: 'en', label: 'English', icon: <FlagUnitedKingdomIcon /> },
  ]

  return (
    <SelectBox onValueChange={changeLanguage} value={locale as string}>
      <SelectOptionsList options={optionSelectLanguage} />
    </SelectBox>
  )
}
