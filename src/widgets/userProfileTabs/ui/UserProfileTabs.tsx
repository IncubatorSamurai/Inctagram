'use client'
import { TabContent, Tabs } from '@/shared/ui/tabs'
import { tabsContent, userProfileTabs } from '../model/tabs'
import s from './UserProfileTabs.module.scss'
import { useRouter } from 'next/navigation'

type Props = {
  part: string
}

export const UserProfileTabs = ({ part }: Props) => {
  const router = useRouter()

  const onValueChange = (e: string) => {
    router.push(`?part=${e}`)
  }
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
