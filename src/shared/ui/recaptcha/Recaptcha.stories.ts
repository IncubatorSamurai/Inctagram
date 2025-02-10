import type { Meta, StoryObj } from '@storybook/react'
import { Recaptcha } from './Recaptcha'
import { action } from '@storybook/addon-actions'

const meta = {
  title: 'Components/Recaptcha',
  component: Recaptcha,
  tags: ['autodocs'],
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hl: 'en',
    onChange: action('onChange'),
  },
}

export const Error: Story = {
  args: {
    ...Default.args,
    error: 'Please verify that you are not a robot',
  },
}
