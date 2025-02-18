import { sidebarItems } from '@/widgets/sidebar'
import { NavItem } from '@/shared/ui/nav-item/NavItem'

export const NavList = () => {
  return (
    <>
      {sidebarItems.secondary.map(i => (
        <NavItem
          classItem={i.classItem}
          key={i.id}
          id={i.id}
          href={i.href}
          name={i.name}
          activeIcon={i.activeIcon}
          icon={i.icon}
          disabled={i.disabled}
        />
      ))}
    </>
  )
}
