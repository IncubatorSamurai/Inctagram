import type { Meta, StoryObj } from '@storybook/react'
import { Scrollbar } from './Scrollbar'
import { Typography } from '../typography'

const meta = {
  title: 'Components/Scrollbar',
  component: Scrollbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Scrollbar>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    style: { maxWidth: '16.875rem', height: '6.25rem' },
    children: (
      <Typography variant="regular_text_14">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, repellendus molestias
        architecto dolor quas quae placeat quo unde voluptatem earum? Ad, optio sed, facilis sequi
        adipisci tempore similique qui ducimus assumenda sint voluptatum veniam neque voluptates
      </Typography>
    ),
  },
}
export const Horizontal: Story = {
  args: {
    ...Vertical.args,
    orientation: 'horizontal',
    style: {maxWidth: '16.875rem',  height: '3.125rem', whiteSpace: 'nowrap' },
  },
}
