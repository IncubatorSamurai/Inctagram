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
import { LogOutOutlineIcon } from '@/shared/assets/icons/LogOutOutlineIcon'
import { PersonIcon } from '@/shared/assets/icons/PersonIcon'
import { CreditCardOutlineIcon } from '@/shared/assets/icons/CreditCardOutlineIcon'
import { ImageOutlineIcon } from '@/shared/assets/icons/ImageOutlineIcon'
import { HomeOutlineIcon } from '@/shared/assets/icons/HomeOutlineIcon'
import { PlusSquareIcon } from '@/shared/assets/icons/PlusSquareIcon'
import { MessageCircleIcon } from '@/shared/assets/icons/MessageCircleIcon'
import { SearchIcon } from '@/shared/assets/icons/SearchIcon'
import { SettingsOutlineIcon } from '@/shared/assets/icons/SettingsOutlineIcon'
import { TrendingUpIcon } from '@/shared/assets/icons/TrendingUpIcon'

import { LogOutIcon } from '@/shared/assets/icons/LogOutIcon'
import { CreditCartIcon } from '@/shared/assets/icons/CreditCardIcon'
import { ImageIcon } from '@/shared/assets/icons/ImageIcon'
import { BookMarkIcon } from '@/shared/assets/icons/BookMarkIcon'
import { NavItem } from '@/shared/ui/nav-item'
import { PATH } from '@/shared/config/routes'

export const sidebarItems = {
  primary: [
    {
      id: uuidv4(),
      name: 'Home',
      icon: <HomeOutlineIcon />,
      href: PATH.HOME,
      disabled: false,
      classItem: 'home',
      activeIcon: <HomeIcon />,
    },
    {
      id: uuidv4(),
      name: 'Create',
      icon: <PlusSquareOutlineIcon />,
      href: PATH.CREATE,
      disabled: false,
      classItem: 'create',
      activeIcon: <PlusSquareIcon />,
    },
    {
      id: uuidv4(),
      name: 'My Profile',
      icon: <PersonOutlineIcon />,
      href: PATH.PROFILE,
      disabled: false,
      classItem: 'profile',
      activeIcon: <PersonIcon />,
    },
    {
      id: uuidv4(),
      name: 'Messenger',
      icon: <MessageCircleOutlineIcon />,
      href: PATH.MESSENGER,
      disabled: false,
      classItem: 'messenger',
      activeIcon: <MessageCircleIcon />,
    },
    {
      id: uuidv4(),
      name: 'Search',
      icon: <SearchOutlineIcon />,
      href: PATH.SEARCH,
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
      href: PATH.STATISTICS,
      disabled: false,
      classItem: 'settings',
      activeIcon: <SettingsIcon />,
    },
    {
      id: uuidv4(),
      name: 'Statistics',
      icon: <TrendingUpOutlineIcon />,
      href: PATH.STATISTICS,
      disabled: false,
      classItem: 'statistics',
      activeIcon: <TrendingUpIcon />,
    },
    {
      id: uuidv4(),
      name: 'Favorites',
      icon: <BookMarkOutlineIcon />,
      href: PATH.FAVORITES,
      disabled: false,
      classItem: 'favorites',
      activeIcon: <BookMarkIcon />,
    },
    {
      id: uuidv4(),
      name: 'Log Out',
      icon: <LogOutOutlineIcon />,
      href: PATH.LOGOUT,
      disabled: false,
      classItem: 'logout',
      activeIcon: <LogOutIcon />,
    },
  ],
  specialAdmin: [
    {
      id: uuidv4(),
      name: 'User List',
      icon: <PersonOutlineIcon />,
      href: PATH.USERS,
      disabled: false,
      classItem: 'user_list',
      activeIcon: <PersonIcon />,
    },
    {
      id: uuidv4(),
      name: 'Statistics',
      icon: <TrendingUpOutlineIcon />,
      href: PATH.STATISTICS,
      disabled: false,
      classItem: 'statistics',
      activeIcon: <TrendingUpIcon />,
    },
    {
      id: uuidv4(),
      name: 'Payments List ',
      icon: <CreditCardOutlineIcon />,
      href: PATH.STATISTICS,
      disabled: false,
      classItem: 'payment',
      activeIcon: <CreditCartIcon />,
    },
    {
      id: uuidv4(),
      name: 'Posts List ',
      icon: <ImageOutlineIcon />,
      href: PATH.POSTS,
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
  return (
    <nav className={s.sidebar}>
      {isAdmin ? (
        <ul className={clsx(s.sidebar_list, s.secondary)}>
          {sidebarItems.specialAdmin.map(item => (
            <NavItem key={item.id} {...item} />
          ))}
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
          </ul>
        </>
      )}
    </nav>
  )
}
