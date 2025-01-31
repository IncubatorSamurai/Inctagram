type Props = {
  params: Promise<{ userId: string }>
}

export default async function UserProfile({ params }: Props) {
  const userId = (await params).userId
  return <div>UserProfile {userId}</div>
}
