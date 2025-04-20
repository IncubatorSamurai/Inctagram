import { StatusModal } from '@/features/settings/accountManegement/ui/StatusModal/StatusModal'

export default async function Parts({ searchParams }: { searchParams: { success: string } }) {
  const success = (await searchParams).success
  return (
    <>
      <StatusModal success={success} />
    </>
  )
}
