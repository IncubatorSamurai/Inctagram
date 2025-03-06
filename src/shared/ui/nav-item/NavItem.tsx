'use client'
import { ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import s from './NavItem.module.scss'
import { Link } from '@/i18n/routing'

export type NavItemProps = {
  id: string
  activeIcon: React.ReactNode
  name: string
  icon: React.ReactNode
  disabled?: boolean
  href: string
  classItem?: string
} & ComponentPropsWithoutRef<'li'>

export const NavItem = ({
  icon,
  activeIcon,
  classItem,
  id,
  name,
  disabled = false,
  href,
  ...props
}: NavItemProps) => {
  const pathName = usePathname()
  const isActive = pathName === href

  return (
    <li
      className={clsx(s.nav_item, classItem ? s[classItem] : '', { [s.active]: isActive })}
      key={id}
      data-disabled={disabled}
      {...props}
    >
      <Link href={href} className={s.nav_link}>
        {isActive ? activeIcon : icon}
        <span className={s.nav_name}>{name}</span>
      </Link>
    </li>
  )
}
