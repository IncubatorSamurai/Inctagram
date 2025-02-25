import { Policy, PrivacyPolicyText } from '@/pagesComponents'

export default function PrivacyPolicies() {
  return (
    <>
      <Policy policyHeader={'Privacy Policy'} policyText={<PrivacyPolicyText />} />
    </>
  )
}
