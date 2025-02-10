import * as TabsRadix from '@radix-ui/react-tabs'
import s from './Tabs.module.scss'
import { Typography } from '../typography'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

export type TabType = {
  title: string
  value: string
  disabled?: boolean
}

// const tabs: TabType[] = [
//   { title: 'General information', value: 'generalInformation' },
//   { title: 'Devices', value: 'devices' },
//   { title: 'Account Management', value: 'accountManagement' },
//   { title: 'My payments', value: 'payments', disabled: true },
// ]

type TabsProps = {
  children: ReactNode
  tabs: TabType[]
} & ComponentPropsWithoutRef<typeof TabsRadix.Root>

export const Tabs = ({ children, tabs, ...props }: TabsProps) => {
  return (
    <TabsRadix.Root className={s.root} defaultValue="generalInformation" {...props}>
      <TabsRadix.List className={s.list} aria-label="Manage your profile">
        {tabs.map(tab => (
          <TabsRadix.Trigger
            key={tab.value}
            className={s.trigger}
            value={tab.value}
            disabled={tab.disabled}
          >
            <Typography variant="h3" className={s.typography}>{tab.title}</Typography>
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>
      {children}
    </TabsRadix.Root>
  )
}

type TabContentProps = {
  children: ReactNode
  value: string
}

export const TabContent = ({ children, value }: TabContentProps) => {
  return (
    <TabsRadix.Content className={s.content} value={value}>
      {children}
    </TabsRadix.Content>
  )
}
