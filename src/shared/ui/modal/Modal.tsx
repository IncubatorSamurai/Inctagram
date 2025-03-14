import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { CloseIcon } from '../../assets/icons/CloseIcon'
import { clsx } from 'clsx'
import * as DialogRadix from '@radix-ui/react-dialog'
import s from './Modal.module.scss'
import { Typography } from '@/shared/ui/typography'

type Props = {
  children?: ReactNode
  className?: string
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

const DialogClose = DialogRadix.Close

const Modal = ({ children, className, title, trigger, ...props }: Props) => {
  return (
    <DialogRadix.Root {...props}>
      {trigger && <DialogRadix.Trigger asChild>{trigger}</DialogRadix.Trigger>}
      <DialogRadix.Portal>
        <DialogRadix.Overlay className={s.DialogOverlay} />
        <DialogRadix.Content
          className={clsx(title && s.DialogContent, !title && s.postContent, className)}
        >
          {title ? (
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
          ) : (
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
Modal.displayName = 'Modal'

export { Modal, DialogClose }
