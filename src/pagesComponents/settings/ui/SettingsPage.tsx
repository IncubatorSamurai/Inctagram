import { UserProfileTabs } from '@/widgets/userProfileTabs'
import s from './SettingsPage.module.scss'

export const SettingsPage = () => {
  return (
    <div className={s.container}>
      <UserProfileTabs />
    </div>
  )
}
