import { Policy } from '@/pagesComponents/policy/ui'
import { TermsOfServiceText } from '@/pagesComponents/policy/ui/TermsOfServiceText'

export default function PrivacyPolicies() {
  return (
    <>
      <Policy policyHeader={'Terms Of Service'} policyText={<TermsOfServiceText />} />
    </>
  )
}
