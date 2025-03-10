import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox, CheckboxProps } from './Checkbox'
import { useState } from 'react'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof Checkbox>

const Render = (args: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(true)

  return <Checkbox {...args} onChange={setIsChecked} checked={isChecked} />
}

export const Default: Story = {
  args: {
    id: '1',
    label: 'Click here',
  },
  render: Render,
}

export const DefaultWithoutLabel: Story = {
  args: {
    id: '1',
  },
  render: Render,
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  render: Render,
}

export const DisabledtWithoutLabel: Story = {
  args: {
    id: '1',
    disabled: true,
  },
  render: Render,
}

export const DefaultWithLinks: Story = {
  args: {
    id: '1',
    label: (
      <span>
        I agree to the <a href="#">Terms of Service </a> and <a href="#">Privacy Policy</a>
      </span>
    ),
    labelForText: 'small_text',
  },
  render: Render,
}

export const DisabledWithLinks: Story = {
  args: {
    ...DefaultWithLinks.args,
    disabled: true,
  },
  render: Render,
}
