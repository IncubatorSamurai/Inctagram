import { PrivacyPolicyText } from '@/pagesComponents/policy/ui/PrivacyPolicyText'
import { Policy } from '@/pagesComponents/policy/ui'

export default function PrivacyPolicies() {
  return (
    <div>
      <Policy policyHeader={'Privacy Policy'} policyText={<PrivacyPolicyText />} />
    </div>
  )
}
