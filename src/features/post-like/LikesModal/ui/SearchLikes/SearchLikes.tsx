import { useGetPostLikesQuery } from '@/shared/api/post/likes/postLikeApi'
import { useDebouncedValue } from '@/shared/hooks' // 👈 либо свой аналог
import { Input } from '@/shared/ui/input'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

type Props = {
	id: number
}

export const SearchLikes = ({ id }: Props) => {
  const [searchLikes, setSearchLikes] = useState('')


  const { data, isFetching } = useGetPostLikesQuery({ id, search: searchLikes },{skip : !searchLikes})
 
 
 console.log(data)
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
