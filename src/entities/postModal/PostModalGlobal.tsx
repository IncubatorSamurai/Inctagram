'use client'
import { useEffect, useState } from 'react'
import { Modal } from '@/shared/ui/modal'
import { useRouter } from '@/i18n/routing'
// import { PostModal } from '@/features/post/PostModal'

type Props = {
  postId: string
}

export const PostModalGlobal = ({ postId }: Props) => {
  const [hrefLinkPost, setHrefLinkPost] = useState<string | null>(null)
  const router = useRouter()

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
      <p>Это контент поста {postId}</p>
    </Modal>
    // <PostModal  postId={+postId}/>
  )
}
