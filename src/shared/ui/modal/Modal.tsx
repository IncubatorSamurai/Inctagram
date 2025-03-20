import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { CloseIcon } from '../../assets/icons/CloseIcon'
import { clsx } from 'clsx'
import * as DialogRadix from '@radix-ui/react-dialog'
import s from './Modal.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Button } from '../button'

type Props = {
  children?: ReactNode
  className?: string
  title?: string
  trigger?: ReactNode
  headerChildren?: ReactNode
  arrow?: (() => void) | null | undefined
} & ComponentPropsWithoutRef<typeof DialogRadix.Root>

const DialogClose = DialogRadix.Close

const Modal = ({ children, className, title, trigger, headerChildren, arrow, ...props }: Props) => {
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
              {headerChildren}
              <DialogRadix.Title className={s.DialogTitle}>
                <Typography variant={'h1'} className={s.title}>
                  {title}
                </Typography>
              </DialogRadix.Title>
              {arrow ? (
                <div onClick={arrow}>
                  <Button aria-label={'Next'} variant="text" className={s.button}>
                    Next
                  </Button>
                </div>
              ) : (
                <DialogRadix.Close asChild>
                  <button aria-label={'Close'} className={s.IconButton}>
                    <CloseIcon />
                  </button>
                </DialogRadix.Close>
              )}
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
