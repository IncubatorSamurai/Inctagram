import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from '@/shared/ui/textarea/TextArea'

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Text-area',
    placeholder: 'placeholder',
    disabled: false,
  },
}
