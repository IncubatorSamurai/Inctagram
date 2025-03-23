'use client'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'

import { clsx } from 'clsx'
import * as DialogRadix from '@radix-ui/react-dialog'
import s from './PostModalNew.module.scss'
import { Typography } from '@/shared/ui/typography'
import { CloseIcon } from '@/shared/assets/icons/CloseIcon'

type Props = {
  children?: ReactNode
  className?: string
  title?: string
  trigger?: ReactNode
  changeEdit: () => void
  isOpenEdit: boolean
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

const DialogClose = DialogRadix.Close

const PostModalNew = ({
  children,
  changeEdit,
  className,
  isOpenEdit,
  title,
  trigger,
  ...props
}: Props) => {
  return (
    <DialogRadix.Root {...props}>
      {trigger && <DialogRadix.Trigger asChild>{trigger}</DialogRadix.Trigger>}
      <DialogRadix.Portal>
        <DialogRadix.Overlay className={s.DialogOverlay} />
        <DialogRadix.Content
          className={clsx(title && s.DialogContent, !title && s.postContent, className)}
          onInteractOutside={e => e.preventDefault()}
        >
          {isOpenEdit ? (
            <div className={s.header}>
              <DialogRadix.Title className={s.DialogTitle}>
                <Typography variant={'h1'}>{title}</Typography>
              </DialogRadix.Title>
              <button aria-label={'Close'} className={s.IconButton} onClick={changeEdit}>
                <CloseIcon />
              </button>
            </div>
          ) : (
            <DialogRadix.Close
              aria-label={'Close'}
              className={s.closeButton}
              onClick={() => console.log('closePostBTN')}
            >
              <CloseIcon />
            </DialogRadix.Close>
          )}
          <div className={clsx(title && s.contentContainer)}>{children}</div>
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  )
}

DialogClose.displayName = DialogRadix.Close.displayName
PostModalNew.displayName = 'Modal'

export { PostModalNew, DialogClose }
