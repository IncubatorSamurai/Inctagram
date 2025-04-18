import { AccountManagement } from "@/features/settings"

export const userProfileTabs = [
  { value: 'generalInformation', title: 'General information' },
  { value: 'devices', title: 'Devices' },
  { value: 'accountManagement', title: 'Account Management' },
  { value: 'payments', title: 'My payments' },
]

export const tabsContent = [
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
    content: <AccountManagement />,
  },
  {
    value: 'payments',
    content: <p>payments</p>,
  },
]
