import type { Meta, StoryObj } from '@storybook/react'
import { SelectBox } from './Select'

const meta = {
  title: 'Components/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectBox>

export default meta
type Story = StoryObj<typeof meta>

export const def: Story = {
  args: {
    options: [
      { id: '1', label: 'html' },
      { id: '2', label: 'css' },
      { id: '3', label: 'javascript' },
    ],
    disabled: false,
    label: 'testL',
    placeholder: 'placeholder',
  },
}

export const selectDisabled: Story = {
  args: {
    options: [
      { id: '1', label: 'html' },
      { id: '2', label: 'css' },
      { id: '3', label: 'javascript' },
    ],
    disabled: true,
    label: 'testL',
    placeholder: 'placeholder',
  },
}

export const selectHover: Story = {
  args: {
    options: [
      { id: '1', label: 'html' },
      { id: '2', label: 'css' },
      { id: '3', label: 'javascript' },
    ],
    disabled: true,
    label: 'testL',
    placeholder: 'placeholder',
  },
  render: () => (
    <SelectBox
      disabled={false}
      options={[
        { id: '1', label: 'html' },
        { id: '2', label: 'css' },
        { id: '3', label: 'javascript' },
      ]}
      open
    ></SelectBox>
  ),
}
