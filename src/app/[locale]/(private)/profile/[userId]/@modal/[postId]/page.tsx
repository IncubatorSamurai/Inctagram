'use client'
import { Modal } from '@/shared/ui/modal'
import { useRouter } from '@/i18n/routing'
import { useEffect, useState } from 'react'

export default function PostModal({
  params,
}: {
  params: Promise<{ userId: string; postId: string }>
}) {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [postId, setPostId] = useState<string | null>(null)
  useEffect(() => {
    params.then(resolvedParams => {
      setUserId(resolvedParams.userId)
      setPostId(resolvedParams.postId)
    })
  }, [params])

  const closeHandler = () => {
    router.back()
  }

  return (
    <Modal open={true} title={'POST'} onOpenChange={closeHandler}>
      <h2>Пост {postId}</h2>
      <p>
        Это контент поста {postId} для пользователя {userId}
      </p>
    </Modal>
  )
}
