import * as TabsRadix from '@radix-ui/react-tabs'
import s from './Tabs.module.scss'
import { Typography } from '../typography'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import clsx from 'clsx'

export type TabType = {
  title: string
  value: string
  disabled?: boolean
}

type TabsProps = {
  children?: ReactNode
  tabs: TabType[]
  fullWidth?: boolean
} & ComponentPropsWithoutRef<typeof TabsRadix.Root>

export const Tabs = ({ children, tabs, fullWidth, className, ...props }: TabsProps) => {
  const classNames = {
    root: clsx(s.root, className),
    list: s.list,
    trigger: clsx(s.trigger, fullWidth && s.fullWidth),
    typography: s.typography,
  }

  return (
    <TabsRadix.Root className={classNames.root} {...props}>
      <TabsRadix.List className={classNames.list} aria-label="Manage your profile">
        {tabs.map(tab => (
          <TabsRadix.Trigger
            key={tab.value}
            className={classNames.trigger}
            value={tab.value}
            disabled={tab.disabled}
          >
            <Typography variant="h3" className={classNames.typography}>
              {tab.title}
            </Typography>
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>
      {children}
    </TabsRadix.Root>
  )
}

export const TabContent = ({ children, value }: { children: ReactNode; value: string }) => {
  return (
    <TabsRadix.Content className={s.content} value={value}>
      {children}
    </TabsRadix.Content>
  )
}
