import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { RadioGroups } from './RadioGroups'
import { RadioGroupProps } from '@radix-ui/react-radio-group'

function RadioGroupComponent(args: RadioGroupProps) {
  const options = [
    { label: 'RadioGroup 1', value: 'RadioGroup-1', id: 'radio-1' },
    { label: 'RadioGroup 2', value: 'RadioGroup-2', id: 'radio-2' },
  ]
  return (
    <RadioGroups {...args} style={{ maxWidth: '300px' }} defaultValue="default" options={options} />
  )
}

const meta = {
  title: 'Components/Radio',
  component: RadioGroups,
  tags: ['autodocs'],
  args: {
    onClick: action('on-click'),
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof RadioGroups>

export default meta
type Story = StoryObj<typeof meta>

export const RadioGroup: Story = {
  args: {
    options: [],
  },
  render: args => RadioGroupComponent(args),
}
