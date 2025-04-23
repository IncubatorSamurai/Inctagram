import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { CloseIcon } from '../../assets/icons/CloseIcon'
import { clsx } from 'clsx'
import * as DialogRadix from '@radix-ui/react-dialog'
import s from './Modal.module.scss'
import { Typography } from '@/shared/ui/typography'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

type Props = {
  children?: ReactNode
  className?: string
  title?: string
  trigger?: ReactNode
  openEdit?: boolean
  isCloseIcon?: boolean
  isTitleHidden?: boolean
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

const DialogClose = DialogRadix.Close
const DialogTitle = DialogRadix.Title

const Modal = ({
  children,
  className,
  title,
  trigger,

  isCloseIcon,
  isTitleHidden,
  ...props
}: Props) => {
  return (
    <DialogRadix.Root {...props}>
      {trigger && <DialogRadix.Trigger asChild>{trigger}</DialogRadix.Trigger>}
      <DialogRadix.Portal>
        <DialogRadix.Overlay className={s.DialogOverlay} />
        <DialogRadix.Content
          className={clsx(title && s.DialogContent, !title && s.postContent, className)}
          aria-describedby={undefined}
        >
          {title && !isTitleHidden && (
            <div className={s.header}>
              <DialogRadix.Title className={s.DialogTitle}>
                <Typography variant={'h1'}>{title}</Typography>
              </DialogRadix.Title>
              <DialogRadix.Close asChild>
                <button aria-label={'Close'} className={s.IconButton}>
                  <CloseIcon />
                </button>
              </DialogRadix.Close>
            </div>
          )}
          {title && isTitleHidden && (
            <VisuallyHidden>
              <DialogRadix.Title className={s.DialogTitle}>{title}</DialogRadix.Title>
            </VisuallyHidden>
          )}
          {!title && isTitleHidden && (
            <VisuallyHidden>
              <DialogRadix.Title className={s.DialogTitle}>NO TITLE</DialogRadix.Title>
            </VisuallyHidden>
          )}
          {isCloseIcon && (
            <DialogRadix.Close aria-label={'Close'} className={s.closeButton}>
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
DialogTitle.displayName = DialogRadix.Title.displayName
Modal.displayName = 'Modal'

export { Modal, DialogClose, DialogTitle }
