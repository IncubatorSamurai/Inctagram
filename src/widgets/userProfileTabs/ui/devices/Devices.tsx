import { Typography } from '@/shared/ui/typography'
import s from './Devices.module.scss'
import { Card } from '@/shared/ui/card'
import { BrowserIcon } from './BrowserIcon'
import { Device } from './device/Device'
import { useGetDevicesQuery } from '@/shared/api/devices/devicesApi'
import { LogOutAllDevice } from '@/features/logOutDevice'
import { useTranslations } from 'next-intl'

export const Devices = () => {
  const { data } = useGetDevicesQuery()

  const tabTranslation = useTranslations('profile.profileSettingsTabs')

  const deviceBrowserName = data?.current.browserName || undefined
  const deviceIp = data?.current.ip || undefined
  const sessions = data?.others

  return (
    <div className={s.root}>
      <Typography className={s.currentDevise} variant="h3">
        {tabTranslation('currentDevice')}
      </Typography>
      <Card className={s.cardRoot}>
        <div className={s.wrapperDevice}>
          <BrowserIcon browser={deviceBrowserName} />
          <div>
            <Typography className={s.test} variant="bold_text_16">
              {deviceBrowserName}
            </Typography>
            <Typography variant="regular_text_14">IP:{deviceIp}</Typography>
          </div>
        </div>
      </Card>
      <div className={s.btnTerminate}>
        <LogOutAllDevice />
      </div>

      <Typography className={s.activeSessions} variant="h3">
        {tabTranslation('activeSession')}
      </Typography>

      {sessions?.map(el => {
        return <Device key={el.deviceId} data={el} />
      })}
    </div>
  )
}
