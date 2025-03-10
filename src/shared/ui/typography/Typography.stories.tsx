import type { Meta, StoryObj } from '@storybook/react'
import { Typography, Variant } from './Typography'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: Variant,
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Text',
  },
}

export const Large: Story = {
  args: {
    children: 'Large',
    variant: 'large',
  },
}

export const H1: Story = {
  args: {
    asChild: true,
    children: <h1>H1</h1>,
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    asChild: true,
    children: <h2>H2</h2>,
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    asChild: true,
    children: <h3>H3</h3>,
    variant: 'h3',
  },
}

export const Regular_text_16: Story = {
  args: {
    children: 'regular_text 16',
    variant: 'regular_text_16',
  },
}

export const Bold_text_16: Story = {
  args: {
    children: 'bold_text 16',
    variant: 'bold_text_16',
  },
}

export const Regular_text_14: Story = {
  args: {
    children: 'regular_text 14',
    variant: 'regular_text_14',
  },
}

export const Medium_text_14: Story = {
  args: {
    children: 'medium_text 14',
    variant: 'medium_text_14',
  },
}

export const Bold_text_14: Story = {
  args: {
    children: 'bold_text 14',
    variant: 'bold_text_14',
  },
}

export const Small_text: Story = {
  args: {
    children: 'small text',
    variant: 'small_text',
  },
}

export const SemiBoldSmallText: Story = {
  args: {
    children: 'semi-bold small_text',
    variant: 'semi-bold_small_text',
  },
}

export const Regular_link: Story = {
  args: {
    asChild: true,
    children: <a>regular link</a>,
    variant: 'regular_link',
  },
}

export const Small_link: Story = {
  args: {
    asChild: true,
    children: <a>small link</a>,
    variant: 'small_link',
  },
}

export const Error: Story = {
  args: {
    children: 'Error text',
    variant: 'error',
  },
}
