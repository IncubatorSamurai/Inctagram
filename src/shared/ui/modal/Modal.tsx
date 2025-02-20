import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { CloseIcon } from '../../assets/icons/CloseIcon'
import { clsx } from 'clsx'
import * as DialogRadix from '@radix-ui/react-dialog'
import s from './Modal.module.scss'

type Props = {
  children?: ReactNode
  className?: string
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

export const Modal = ({ children, className, title, trigger, ...props }: Props) => {
  return (
    <DialogRadix.Root {...props}>
      {trigger && <DialogRadix.Trigger>{trigger}</DialogRadix.Trigger>}
      <DialogRadix.Portal>
        <DialogRadix.Overlay className={s.DialogOverlay} />
        <DialogRadix.Content
          className={clsx(title && s.DialogContent, !title && s.postContent, className)}
        >
          {title ? (
            <div className={s.header}>
              <DialogRadix.Title className={s.DialogTitle}>{title}</DialogRadix.Title>
              <DialogRadix.Close aria-label={'Close'}>
                <CloseIcon className={s.IconButton} />
              </DialogRadix.Close>
            </div>
          ) : (
            <DialogRadix.Close aria-label={'Close'} className={s.closeButton}>
              <CloseIcon />
            </DialogRadix.Close>
          )}
          <div className={clsx(title && s.contentContainer)}>
            <div>{children}</div>
          </div>
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  )
}
