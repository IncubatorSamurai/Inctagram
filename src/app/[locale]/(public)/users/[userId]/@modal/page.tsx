'use client'
import { Modal } from '@/shared/ui/modal'
import { useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { use } from 'react'
import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'

export default function PostModal({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const hrefLinkPost = `/${isLoggedIn ? 'profile' : 'users'}/${userId}`

  const closeModal = () => {
    if (window.history.length > 2) {
      router.back()
    } else {
      router.replace(hrefLinkPost, { scroll: false })
    }
  }

  return (
    <Modal open={!!postId} title={'POST'} onOpenChange={isOpen => !isOpen && closeModal()}>
      <h2>Пост {postId}</h2>
      <p>
        Это контент поста {postId} для пользователя {userId}
      </p>
    </Modal>
  )
}
