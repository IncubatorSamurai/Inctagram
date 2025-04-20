'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { DialogClose, Modal } from '@/shared/ui/modal'
import { Button } from '@/shared/ui/button'

type Props = {
  status: string
}

export const StatusModal = ({ status }: Props) => {
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
    <Modal
      open={!!status}
      title={status === 'error' ? 'Error' : 'Success'}
      onOpenChange={isOpen => !isOpen && closeModal}
    >
      Content
      <DialogClose asChild>
        <Button>{status === 'error' ? 'Back to payment' : 'Ok'}</Button>
      </DialogClose>
    </Modal>
  )
}
