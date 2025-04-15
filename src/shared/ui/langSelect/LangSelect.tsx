import React from 'react'
import { SelectBox } from '@/shared/ui/select'
import { useRouter } from '@/i18n/routing'
import { SelectOptionsList } from '@/shared/ui/select/SelectOptionsList'
import { FlagRussiaIcon } from '@/shared/assets/icons/FlagRussiaIcon'
import { FlagUnitedKingdomIcon } from '@/shared/assets/icons/FlagUnitedKingdomIcon'
import { useParams } from 'next/navigation'
import { useFullUrl } from '@/shared/hooks/useFullUrl'

export const LangSelect = () => {
  const { locale } = useParams()
  const router = useRouter()
  const url = useFullUrl()

  const changeLanguage = (newLocale: string) => {
    router.replace(url, { locale: newLocale }) // Меняем локаль без перезагрузки
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
