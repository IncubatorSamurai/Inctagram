import { Policy, TermsOfServiceText } from '@/pagesComponents'

export default function PrivacyPolicies() {
  return (
    <>
      <Policy policyHeader={'Terms Of Service'} policyText={<TermsOfServiceText />} />
    </>
  )
}
