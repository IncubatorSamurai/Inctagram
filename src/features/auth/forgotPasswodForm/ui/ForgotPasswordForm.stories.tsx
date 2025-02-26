import type { Meta, StoryObj } from '@storybook/react'
import { ForgotPasswordForm } from '@/features/auth/forgotPasswodForm/ui/ForgotPasswordForm'

const meta = {
  title: 'Components/ForgotPasswordForm',
  component: ForgotPasswordForm,
  tags: ['autodocs'],
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordFormDemo: Story = {}
