import type { Meta, StoryObj } from '@storybook/react'
import { Policy } from '@/pagesComponents/policy/ui/Policy'
import { PrivacyPolicyText } from '@/pagesComponents/policy/ui/PrivacyPolicyText'

const meta = {
  title: 'Components/Policy',
  component: Policy,
  tags: ['autodocs'],
} satisfies Meta<typeof Policy>

export default meta
type Story = StoryObj<typeof meta>

export const PrivacyPolicy: Story = {
  args: {
    policyHeader: 'Privacy Policy',
    policyText: <PrivacyPolicyText />,
  },
}
export const TermsOfService: Story = {
  args: {
    policyHeader: 'Terms Of Service',
    policyText: <PrivacyPolicyText />,
  },
}
