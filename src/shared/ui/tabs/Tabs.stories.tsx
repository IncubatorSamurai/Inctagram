import type { Meta, StoryObj } from '@storybook/react'
import { TabContent, Tabs, TabType } from './Tabs'
import { useState } from 'react'
import { TabsProps } from '@radix-ui/react-tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof Tabs>

const Render = (args: TabsProps) => {
  const tabs: TabType[] = [
    { title: 'General', value: 'generalInformation' },
    { title: 'Devices', value: 'devices' },
    { title: 'Account', value: 'accountManagement' },
    { title: 'My payments', value: 'payments', disabled: true },
  ]
  // const [defaultValue, setDefaultValue] = useState('generalInformation')

  return (
    <Tabs {...args} tabs={tabs}>
      <>
        <TabContent value="generalInformation">Content of general information</TabContent>
        <TabContent value="devices">Content of devices</TabContent>
        <TabContent value="accountManagement">Content of account management</TabContent>
        <TabContent value="payments">Content of payments</TabContent>
      </>
    </Tabs>
  )
}

export const DefaultTabs: Story = {
  args: {
    defaultValue: 'generalInformation',
  },
  render: Render,
}
