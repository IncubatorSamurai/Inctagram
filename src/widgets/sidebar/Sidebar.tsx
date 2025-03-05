'use client'
import { v4 as uuidv4 } from 'uuid'

import s from './Sidebar.module.scss'

import clsx from 'clsx'
import { SettingsIcon } from '@/shared/assets/icons/SettingsIcon'
import { HomeIcon } from '@/shared/assets/icons/HomeIcon'
import { PlusSquareOutlineIcon } from '@/shared/assets/icons/PlusSquareOutlineIcon'
import { PersonOutlineIcon } from '@/shared/assets/icons/PersonOutlineIcon'
import { MessageCircleOutlineIcon } from '@/shared/assets/icons/MessageCircleOutlineIcon'
import { SearchOutlineIcon } from '@/shared/assets/icons/SearchOutlineIcon'
import { TrendingUpOutlineIcon } from '@/shared/assets/icons/TrendingUpOutlineIcon'
import { BookMarkOutlineIcon } from '@/shared/assets/icons/BookMarkOutlineIcon'
import { PersonIcon } from '@/shared/assets/icons/PersonIcon'
import { CreditCardOutlineIcon } from '@/shared/assets/icons/CreditCardOutlineIcon'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import { HomeOutlineIcon } from '@/shared/assets/icons/HomeOutlineIcon'
import { PlusSquareIcon } from '@/shared/assets/icons/PlusSquareIcon'
import { MessageCircleIcon } from '@/shared/assets/icons/MessageCircleIcon'
import { SearchIcon } from '@/shared/assets/icons/SearchIcon'
import { SettingsOutlineIcon } from '@/shared/assets/icons/SettingsOutlineIcon'
import { TrendingUpIcon } from '@/shared/assets/icons/TrendingUpIcon'
import { CreditCartIcon } from '@/shared/assets/icons/CreditCardIcon'
import { ImageIcon } from '@/shared/assets/icons/ImageIcon'
import { BookMarkIcon } from '@/shared/assets/icons/BookMarkIcon'
import { NavItem } from '@/shared/ui/nav-item'
import { useAppSelector } from '@/shared/hooks'
import { selectIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { LogOut } from '@/features/auth/logout/ui/LogOut'

export const sidebarItems = {
  primary: [
    {
      id: uuidv4(),
      name: 'Home',
      icon: <HomeOutlineIcon />,
      href: '/home',
      disabled: false,
      classItem: 'home',
      activeIcon: <HomeIcon />,
    },
    {
      id: uuidv4(),
      name: 'Create',
      icon: <PlusSquareOutlineIcon />,
      href: '/create',
      disabled: false,
      classItem: 'create',
      activeIcon: <PlusSquareIcon />,
    },
    {
      id: uuidv4(),
      name: 'My Profile',
      icon: <PersonOutlineIcon />,
      href: '/profile',
      disabled: false,
      classItem: 'profile',
      activeIcon: <PersonIcon />,
    },
    {
      id: uuidv4(),
      name: 'Messenger',
      icon: <MessageCircleOutlineIcon />,
      href: '/messenger',
      disabled: false,
      classItem: 'messenger',
      activeIcon: <MessageCircleIcon />,
    },
    {
      id: uuidv4(),
      name: 'Search',
      icon: <SearchOutlineIcon />,
      href: '/search',
      disabled: false,
      classItem: 'search',
      activeIcon: <SearchIcon />,
    },
  ],
  secondary: [
    {
      id: uuidv4(),
      name: 'Profile Settings ',
      icon: <SettingsOutlineIcon />,
      href: '/statistic',
      disabled: false,
      classItem: 'settings',
      activeIcon: <SettingsIcon />,
    },
    {
      id: uuidv4(),
      name: 'Statistics',
      icon: <TrendingUpOutlineIcon />,
      href: '/statistic',
      disabled: false,
      classItem: 'statistics',
      activeIcon: <TrendingUpIcon />,
    },
    {
      id: uuidv4(),
      name: 'Favorites',
      icon: <BookMarkOutlineIcon />,
      href: '/favorites',
      disabled: false,
      classItem: 'favorites',
      activeIcon: <BookMarkIcon />,
    },
  ],
  specialAdmin: [
    {
      id: uuidv4(),
      name: 'User List',
      icon: <PersonOutlineIcon />,
      href: '/users',
      disabled: false,
      classItem: 'user_list',
      activeIcon: <PersonIcon />,
    },
    {
      id: uuidv4(),
      name: 'Statistics',
      icon: <TrendingUpOutlineIcon />,
      href: '/statistic',
      disabled: false,
      classItem: 'statistics',
      activeIcon: <TrendingUpIcon />,
    },
    {
      id: uuidv4(),
      name: 'Payments List ',
      icon: <CreditCardOutlineIcon />,
      href: '/payment',
      disabled: false,
      classItem: 'payment',
      activeIcon: <CreditCartIcon />,
    },
    {
      id: uuidv4(),
      name: 'Posts List ',
      icon: <ImageOutlineIcon />,
      href: '/posts',
      disabled: false,
      classItem: 'posts',
      activeIcon: <ImageIcon />,
    },
  ],
}
type Sidebar = {
  isAdmin?: boolean
}

export const Sidebar = ({ isAdmin }: Sidebar) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  if (!isLoggedIn) return null // Если не залогинен, ничего не рендерим

  return (
    <nav className={s.sidebar}>
      {isAdmin ? (
        <ul className={clsx(s.sidebar_list, s.secondary)}>
          {sidebarItems.specialAdmin.map(item => (
            <NavItem key={item.id} {...item} />
          ))}
          <LogOut/>
        </ul>
      ) : (
        <>
          <ul className={clsx(s.sidebar_list, s.primary)}>
            {sidebarItems.primary.map(item => (
              <NavItem key={item.id} {...item} />
            ))}
          </ul>
          <ul className={clsx(s.sidebar_list, s.secondary)}>
            {sidebarItems.secondary.map(item => (
              <NavItem key={item.id} {...item} />
            ))}
            <LogOut/>
          </ul>

        </>
      )}
    </nav>
  )
}
