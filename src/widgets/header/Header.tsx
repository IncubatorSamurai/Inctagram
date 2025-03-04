'use client'
import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import Image from 'next/image'
import s from './Header.module.scss'
import { Typography } from '@/shared/ui/typography'
import { HeaderSpecialButtons } from '@/widgets/header/HeaderSpecialButtons'
import Link from 'next/link'
import { Dropdown } from '@/shared/ui/dropdown'
import { NavList } from '@/shared/ui/nav-item/NavList'
import { MoreHorizontalIcon } from '@/shared/assets/icons/MoreHorizontalIcon'
import { LangSelect } from '@/shared/ui/langSelect/LangSelect'
import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'

type HeaderType = {
  headerTitle?: string
  headerLogo?: string
  link?: string
  isAdmin?: boolean
} & ComponentPropsWithoutRef<'header'>

const Header = ({ isAdmin, link, headerTitle, headerLogo, ...rest }: HeaderType) => {
  // Resize watching
  const [isMobile, setIsMobile] = useState(false)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768) // Устанавливаем состояние в true, если ширина экрана <= 768px
  }

  useEffect(() => {
    handleResize() // Устанавливаем начальное состояние при монтировании
    window.addEventListener('resize', handleResize) // Слушаем изменения размера окна
    return () => {
      window.removeEventListener('resize', handleResize) // Убираем обработчик при размонтировании компонента
    }
  }, [])

  return (
    <>
      <header className={s.header} {...rest}>
        <div className={s.container}>
          <Link className={s.header_logo} href={link || '#'}>
            {headerLogo && (
              <Image
                src={headerLogo}
                alt={headerTitle || 'Логотип'}
                width={150}
                height={50}
                priority
              />
            )}
            <Typography variant={'large'}>{headerTitle} </Typography>
            {isAdmin && (
              <Typography variant={'small_text'}>
                Super<b>Admin</b>
              </Typography>
            )}
          </Link>
          <nav className={s.main_nav}>
            <LangSelect />
            {isMobile ? (
              <Dropdown
                iconTrigger={<MoreHorizontalIcon />}
                className={isLoggedIn ? s.header_dropdown : s.header_dropdown_noAuth}
                classContent={s.header_dropdown_content}
                classItemsContainer={s.header_dropdown_items_contaner}
              >
                {isLoggedIn ? <NavList /> : <HeaderSpecialButtons />}
              </Dropdown>
            ) : isLoggedIn ? undefined : (
              <HeaderSpecialButtons />
            )}
          </nav>
        </div>
      </header>
    </>
  )
}

export { Header }
