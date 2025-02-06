import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { RadioGroups, RadioProps } from './RadioGroups'

const options = [
  { label: 'RadioGroup 1', value: 'RadioGroup-1', id: 'radio-1' },
  { label: 'RadioGroup 2', value: 'RadioGroup-2', id: 'radio-2' },
]

function RadioGroupComponent(args: RadioProps) {
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
    options: options,
  },
  render: args => RadioGroupComponent(args),
}
