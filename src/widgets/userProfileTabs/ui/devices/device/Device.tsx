import { Card } from '@/shared/ui/card'
import s from '../Devices.module.scss'
import { Typography } from '@/shared/ui/typography'
import { ActiveSession } from '../ActiveSession'
import { LogOutDevice } from '@/features/logOutDevice'
import { Device as DeviceType } from '@/shared/api/devices/devicesApiType'
import { useTranslations } from 'next-intl'

type Props = {
  data: DeviceType
}

export const Device = ({ data }: Props) => {
  const sessionDevice = data?.deviceName || 'Desktop'

  const tabTranslation = useTranslations('profile.profileSettingsTabs')

  return (
    <Card className={s.cardRoot}>
      <div className={s.wrapperSession}>
        <div className={s.sessionLeft}>
          <ActiveSession name={sessionDevice} />
          <div>
            <Typography className={s.nameDevice} variant="bold_text_16">
              {data?.osName} {data?.osVersion}
            </Typography>
            <Typography variant="regular_text_14">IP:{data?.ip}</Typography>
            <Typography variant="small_text">
              {tabTranslation('lastVisit')}:{' '}
              {new Date(data?.lastActive).toLocaleDateString('ru-RU')}
            </Typography>
          </div>
        </div>
        <div>
          <LogOutDevice id={data.deviceId} />
        </div>
      </div>
    </Card>
  )
}
