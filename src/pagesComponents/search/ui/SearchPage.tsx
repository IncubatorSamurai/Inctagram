'use client'
import { Input } from '@/shared/ui/input'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import s from './SearchPage.module.scss'
import { SearchUser } from '@/features/searchUser'

export const SearchPage = () => {
  const t = useTranslations('search')
  const [searchUser, setSearchUser] = useState('')

  return (
    <div className={s.container}>
      <Typography variant="h1" asChild>
        <h1>{t('search')}</h1>
      </Typography>
      <Input
        type="search"
        placeholder={t('search')}
        value={searchUser}
        onChange={e => setSearchUser(e.target.value)}
      />
      <Typography variant="bold_text_16">{t('recentRequests')}</Typography>
      <SearchUser searchUser={searchUser} />
    </div>
  )
}
