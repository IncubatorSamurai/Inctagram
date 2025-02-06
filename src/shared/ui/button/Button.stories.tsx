import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography'

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

export const Link: Story = {
  args: {
    asChild: true,
    children: <a href={'https://www.google.com/'}>link</a>,
  },
}

export const IconButton: Story = {
  args: {
    asChild: true,
    children: (
      <div>
        <Image src="/globe.svg" alt="icon" width={'24'} height={'24'} />
        <Typography variant={'h3'}>Icon Button</Typography>
      </div>
    ),
    variant: 'icon',
    disabled: false,
  },
}
