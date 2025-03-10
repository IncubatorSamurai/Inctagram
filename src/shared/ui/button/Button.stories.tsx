import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outline', 'text'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    disabled: false,
  },
}
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
    disabled: false,
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
    disabled: false,
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    children: 'Full Width Primary Button',
    disabled: false,
    fullWidth: true,
  },
}

export const LinkVariant: Story = {
  args: {
    asChild: true,
    children: <Link href={'https://www.google.com/'}>link</Link>,
  },
}

export const IconButton: Story = {
  args: {
    children: <Image src="/globe.svg" alt="icon" width={24} height={24} />,
    variant: 'icon',
    disabled: false,
  },
}

export const LinkText: Story = {
  args: {
    asChild: true,
    variant: 'text',
    children: <Link href={'https://www.google.com/'}>link</Link>,
  },
}
