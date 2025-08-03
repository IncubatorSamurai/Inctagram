import { Input } from '@/shared/ui/input'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useDebouncedEffect } from '@/shared/hooks'

type Props = {
  setTerm: (term: string) => void
}

export const SearchLikes = ({ setTerm }: Props) => {
  const [searchLikes, setSearchLikes] = useState('')
  useDebouncedEffect(() => setTerm(searchLikes.trim()), [searchLikes], 500)

  const t = useTranslations('search')

  return (
    <Input
      type="search"
      placeholder={t('search')}
      value={searchLikes}
      onChange={e => setSearchLikes(e.target.value)}
    />
  )
}
