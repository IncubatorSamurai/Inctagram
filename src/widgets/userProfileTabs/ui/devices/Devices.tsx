import { Typography } from '@/shared/ui/typography'
import s from './Devisec.module.scss'
import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button/Button'
import { BrowserIcon } from './BrowserIcon'
import { Device } from './device/Device'
import { useGetDevicesQuery } from '@/shared/api/devices/devicesApi'


export const Devisec = () => {
  const { data } = useGetDevicesQuery()

  const deviceBrowserName = data?.current.browserName || undefined
  const deviceIp = data?.current.ip || undefined
  const sesions = data?.others

  console.log('serverData:', data)
  
  return (
    <div className={s.root}>
      <Typography className={s.currentDevise} variant="h3">
        Current device
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
        <Button variant="outline">Terminate all other session</Button>
      </div>

      <Typography className={s.activeSessions} variant="h3">
        Active sessions
      </Typography>

      {sesions?.map(el => {
        return (
          <Device
          id={el.deviceId}
            key={el.deviceId}
            device={el.deviceName}
            ip={el.ip}
            osName={el.osName}
            osVersion={el.osVersion}
            lastVisit={el.lastActive}
          />
        )
      })}
    </div>
  )
}
