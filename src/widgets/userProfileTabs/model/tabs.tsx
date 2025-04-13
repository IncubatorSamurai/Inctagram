import { GeneralInfoTab } from '@/widgets/userProfileTabs/ui/generalInfo/GeneralInfoTab'

export const userProfileTabs = [
  { value: 'generalInformation', title: 'General information' },
  { value: 'devices', title: 'Devices' },
  { value: 'accountManagement', title: 'Account Management' },
  { value: 'payments', title: 'My payments' },
]

export const tabsContent = [
  {
    value: 'generalInformation',
    content: <GeneralInfoTab/>,
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
