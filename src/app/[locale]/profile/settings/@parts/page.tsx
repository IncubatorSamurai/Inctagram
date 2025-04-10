import { UserProfileTabs } from '@/widgets/userProfileTabs'
import { redirect } from 'next/navigation'

export default async function Parts({ searchParams }: { searchParams: { part: string } }) {
  const part = (await searchParams).part
  if (!part) redirect('/profile/settings?part=generalInformation')
  return <UserProfileTabs part={part} />
}
