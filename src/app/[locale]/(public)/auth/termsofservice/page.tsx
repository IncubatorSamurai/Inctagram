import { Policy, TermsOfServiceText } from '@/pagesComponents'
import { useTranslations } from 'next-intl'

export default function PrivacyPolicies() {
  const tAuth = useTranslations('auth')

  return (
    <>
      <Policy policyHeader={tAuth('termsOfService')} policyText={<TermsOfServiceText />} />
    </>
  )
}
