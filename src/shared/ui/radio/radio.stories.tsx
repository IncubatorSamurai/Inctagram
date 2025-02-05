import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './radio'

const meta = {
    title: 'Components/Radio',
    component: Radio,
    tags: ['autodocs'],
    argTypes: {
        // variant: {
        //     options: ['primary', 'secondary'],
        //     control: { type: 'radio' },
        // },
    },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const RadioButton: Story = {
    args: {

    },
}

