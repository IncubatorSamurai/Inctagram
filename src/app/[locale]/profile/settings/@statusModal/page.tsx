import { StatusModal } from '@/features/settings/accountManegement/ui/StatusModal/StatusModal'

export default async function Parts({ searchParams }: { searchParams: { status: string } }) {
  const status = (await searchParams).status
  return (
    <>
      <StatusModal status={status} />
    </>
  )
}
