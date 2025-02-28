'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import s from './Dropdown.module.scss'
import { Button } from '@/shared/ui/button'

import * as React from 'react'

import { Typography } from '@/shared/ui/typography'
import clsx from 'clsx'
import { Scrollbar } from '@/shared/ui/scrollbar'

import { ArrowIcon } from '@/shared/assets/icons/ArrowIcon'

export type DropdownProps = {
  className?: string

  iconTrigger?: React.ReactNode
  isArrow?: boolean
  classContent?: string
  classItemsContainer?: string
  children?: React.ReactNode
  labelName?: string
}
export const Dropdown = ({
  classContent,
  children,
  labelName,
  isArrow,
  iconTrigger,
  className,
  classItemsContainer,
  ...props
}: DropdownProps) => {
  return (
    <div className={className}>
      <DropdownMenu.Root {...props}>
        <DropdownMenu.Trigger asChild>
          <Button variant={'text'} className={s.IconButton} aria-label="Customise options">
            {iconTrigger ? iconTrigger : '...'}
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className={clsx(s.Content, classContent)} sideOffset={5}>
            {labelName && (
              <DropdownMenu.Label className={s.Label}>
                <Typography variant={'h3'}>{labelName}</Typography>
              </DropdownMenu.Label>
            )}

            <Scrollbar orientation="vertical">
              <ul className={clsx(s.dropdown_items_container, classItemsContainer)}>{children}</ul>
            </Scrollbar>
            {isArrow && (
              <DropdownMenu.Arrow className={s.Arrow} asChild={true}>
                <ArrowIcon />
              </DropdownMenu.Arrow>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
