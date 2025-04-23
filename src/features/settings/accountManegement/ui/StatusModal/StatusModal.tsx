'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { DialogClose, Modal } from '@/shared/ui/modal'
import { Button } from '@/shared/ui/button'
import s from './StatusModal.module.scss'
import { Typography } from '@/shared/ui/typography'

type Props = {
  success: string
}

export const StatusModal = ({ success }: Props) => {
  const [cleanUrl, setcleanUrl] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.delete('success')
      setcleanUrl(currentUrl.pathname + '?' + currentUrl.searchParams.toString())
    }
  }, [])

  const closeModal = () => {
    if (cleanUrl) {
      router.replace(cleanUrl, { scroll: false })
    } else {
      router.back()
    }
  }

  return (
    <Modal
      open={!!success}
      title={success === 'error' ? 'Error' : 'Success'}
      onOpenChange={isOpen => !isOpen && closeModal()}
    >
      <div className={s.container}>
        <Typography variant={'medium_text_16'}>
          {success === 'error'
            ? 'Transaction failed. Please, write to support'
            : 'Payment was successful!'}
        </Typography>
        <DialogClose asChild>
          <Button fullWidth>{success === 'error' ? 'Back to payment' : 'Ok'}</Button>
        </DialogClose>
      </div>
    </Modal>
  )
}
