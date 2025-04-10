import { EditUserProfileForm, UploadUserAvatar } from '@/features/settings'
import s from './GeneralInfo.module.scss'

export const GeneralInfoTab = () => {
  return (
    <div className={s.row}>
      <div className={s.item}>
        <UploadUserAvatar />
      </div>
      <div className={s.item}>
        <EditUserProfileForm />
      </div>
    </div>
  )
}
