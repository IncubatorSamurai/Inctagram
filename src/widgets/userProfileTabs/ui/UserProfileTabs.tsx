import { TabContent, Tabs } from '@/shared/ui/tabs'
import { userProfileTabs } from '../model/tabs'
import { GeneralInfoTab } from './generalInfo/GeneralInfoTab'
import s from './UserProfileTabs.module.scss'

export const UserProfileTabs = () => {
  const tabsContent = [
    {
      value: 'generalInformation',
      content: <GeneralInfoTab />,
    },
    {
      value: 'devices',
      content: <p>devices</p>,
    },

    {
      value: 'accountManagement',
      content: <p>accountManagement</p>,
    },
    {
      value: 'payments',
      content: <p>payments</p>,
    },
  ]

  return (
    <Tabs defaultValue="generalInformation" tabs={userProfileTabs}>
      <div className={s.tabContainer}>
        {tabsContent.map((tab, i) => (
          <TabContent key={i} value={tab.value}>
            {tab.content}
          </TabContent>
        ))}
      </div>
    </Tabs>
  )
}
