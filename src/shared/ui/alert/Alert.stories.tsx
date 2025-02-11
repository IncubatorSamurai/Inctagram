import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alert'
import { Typography } from '../typography'
import { action } from '@storybook/addon-actions'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],

  argTypes: {
    variant: {
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    variant: 'success',
    children: <Typography variant="regular_text_16">Your settings are saved</Typography>,
    handleClick: action('click'),
  },
}

export const Error: Story = {
  args: {
    ...Success.args,
    variant: 'error',
    children: (
      <Typography variant="regular_text_16">
        <b>Error!</b> Server is not available
      </Typography>
    ),
  },
}
export const FullWidth: Story = {
  args: {
    ...Success.args,
    fullWidth: true,
  },
}
