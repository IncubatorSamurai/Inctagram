import { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    style: { width: '6.25rem', height: '6.25rem' },
  },
}
