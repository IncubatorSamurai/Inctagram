import type { Meta, StoryObj } from '@storybook/react'
import { SelectBox } from './Select'
import { SelectItem } from './selectItem/SelectItem'

const meta = {
  title: 'Components/SelectBox',
  component: SelectBox,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof SelectBox>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { id: '1', label: 'HTML' },
  { id: '2', label: 'CSS' },
  { id: '3', label: 'JavaScript' },
]

// Функция для генерации элементов списка
const renderOptions = () =>
    options.map(option => (
        <SelectItem key={option.id} value={option.id} className="select-item">
          {option.label}
        </SelectItem>
    ))

export const Default: Story = {
  args: {
    disabled: false,
    label: 'Select a Technology',
    placeholder: 'Choose...',
    children: renderOptions(),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Select',
    placeholder: 'Cannot select',
    children: renderOptions(),
  },
}

export const OpenByDefault: Story = {
  args: {
    disabled: false,
    label: 'Open by default',
    placeholder: 'Choose...',
    children: renderOptions(),
  },
  render: args => <SelectBox {...args} defaultOpen />,
}
