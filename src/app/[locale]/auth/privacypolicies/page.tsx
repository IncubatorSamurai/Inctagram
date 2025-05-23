'use client'
import { Policy, PrivacyPolicyText } from '@/pagesComponents'
import { useTranslations } from 'next-intl'

export default function PrivacyPolicies() {
  const tAuth = useTranslations('auth')

  return (
    <>
      <Policy policyHeader={tAuth('privacyPolicy')} policyText={<PrivacyPolicyText />} />
    </>
  )
}
