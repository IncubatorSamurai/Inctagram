import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { action } from '@storybook/addon-actions'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Type something...',
    onChange: action('onChange'),
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Epam@epam.com',
    label: 'Email',
    onChange: action('onChange'),
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
    onChange: action('onChange'),
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Input search',
    onChange: action('onChange'),
  },
}

export const WithError: Story = {
  args: {
    placeholder: 'Invalid input',
    error: 'This field is required',
    onChange: action('onChange'),
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}
