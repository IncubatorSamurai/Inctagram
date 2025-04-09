import { TabContent, Tabs } from '@/shared/ui/tabs'
import { userProfileTabs } from '../model/tabs'

export const UserProfileTabs = () => {
  const tabsContent = [
    {
      value: 'generalInformation',
      content: <p>generalInformation</p>,
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
      {tabsContent.map((tab, i) => (
        <TabContent key={i} value={tab.value}>
          {tab.content}
        </TabContent>
      ))}
    </Tabs>
  )
}
