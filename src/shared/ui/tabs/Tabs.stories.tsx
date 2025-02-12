import type { Meta, StoryObj } from '@storybook/react'
import { TabContent, Tabs, TabType } from './Tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

const defaultTabs: TabType[] = [
  { title: 'General', value: 'generalInformation' },
  { title: 'Devices', value: 'devices' },
  { title: 'Account', value: 'accountManagement' },
  { title: 'My payments', value: 'payments' },
]

export const Default: Story = {
  args: {
    defaultValue: 'generalInformation',
    tabs: defaultTabs,
    children: (
      <>
        {defaultTabs.map(tab => (
          <TabContent key={tab.value} value={tab.value}>
            Content of {tab.title}
          </TabContent>
        ))}
      </>
    ),
  },
  render: args => <Tabs {...args}>{args.children}</Tabs>,
}

export const DefaultWithDisabled: Story = {
  args: {
    ...Default.args,
    tabs: defaultTabs.map(tab => (tab.value === 'payments' ? { ...tab, disabled: true } : tab)),
  },
  render: args => <Tabs {...args}>{args.children}</Tabs>,
}

export const DefaultFullWidth: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
  },
  render: args => <Tabs {...args}>{args.children}</Tabs>,
}
