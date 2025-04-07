'use client'
import { Modal } from '@/shared/ui/modal'
import { useRouter } from '@/i18n/routing'
import { useSearchParams } from 'next/navigation'
import { use, useEffect, useState } from 'react'

export default function PostModal({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const [hrefLinkPost, setHrefLinkPost] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.delete('postId')
      setHrefLinkPost(currentUrl.pathname + currentUrl.search)
    }
  }, [])

  const closeModal = () => {
    if (window.history.length > 2) {
      router.back()
    } else if (hrefLinkPost) {
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
