'use client'
import { TabContent, Tabs } from '@/shared/ui/tabs'
import { tabsContent, userProfileTabs } from '../model/tabs'
import s from './UserProfileTabs.module.scss'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/shared/store'
import { PATH } from '@/shared/config/routes'
import { useEffect } from 'react'

type Props = {
  part: string
}

export const UserProfileTabs = ({ part }: Props) => {
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const onValueChange = (e: string) => {
    router.push(`?part=${e}`)
  }

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(PATH.SIGNIN)
    }
  }, [isLoggedIn])

  return (
    <div className={s.container}>
      <Tabs onValueChange={onValueChange} value={part} tabs={userProfileTabs} fullWidth>
        <div className={s.tabContainer}>
          {tabsContent.map(tab => (
            <TabContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
