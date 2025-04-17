import { EditUserProfileForm, UploadUserAvatar } from '@/features/settings'
import s from './GeneralInfo.module.scss'
import clsx from 'clsx'
import { useTrackPrevPath } from '@/shared/hooks/useTrackPrevPath'

export const GeneralInfoTab = () => {
  useTrackPrevPath()
  return (
    <div className={s.row}>
      <div className={s.item}>
        <UploadUserAvatar />
      </div>
      <div className={clsx(s.item, s.content)}>
        <EditUserProfileForm />
      </div>
    </div>
  )
}
