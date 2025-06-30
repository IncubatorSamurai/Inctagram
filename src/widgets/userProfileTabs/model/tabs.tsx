import { GeneralInfoTab } from '../ui/generalInfo/GeneralInfoTab'
import { Payments } from '@/widgets/userProfileTabs/ui/payments/Payments'
import { AccountManagement } from '@/features/settings'
import { Devices } from '../ui/devices/Devices'

export const userProfileTabs = [
  { value: 'generalInformation', title: 'General information' },
  { value: 'devices', title: 'Devices' },
  { value: 'accountManagement', title: 'Account Management' },
  { value: 'payments', title: 'My payments' },
]

export const tabsContent = [
  {
    value: 'generalInformation',
    content: <GeneralInfoTab />,
  },
  {
    value: 'devices',
    content: <Devices />,
  },

  {
    value: 'accountManagement',
    content: <AccountManagement />,
  },
  {
    value: 'payments',
    content: <Payments />,
  },
]
