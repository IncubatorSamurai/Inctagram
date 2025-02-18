import { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'
import { ChromeIcon } from '@/shared/assets/icons/ChromeIcon'
import { Typography } from '../typography'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const SimpleCard: Story = {
  args: {
    style: { width: '6.25rem', height: '6.25rem' },
  },
}

export const CurrentDeviceDemo: Story = {
  render: () => (
    <Card style={{ height: '7.5rem', display: 'flex', gap: '0.75rem', padding: '1.125rem 1.5rem' }}>
      <ChromeIcon style={{ marginTop: '0.375rem' }} />
      <div>
        <Typography variant="bold_text_16">Chrome</Typography>
        <Typography variant="regular_text_14" style={{ padding: '0.75rem 0 0.3125rem' }}>
          IP: 22.345.345.12
        </Typography>
      </div>
    </Card>
  ),
}
