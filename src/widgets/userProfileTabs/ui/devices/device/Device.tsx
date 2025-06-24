import { Card } from '@/shared/ui/card'
import s from '../Devisec.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { LogOutIcon } from '@/shared/assets/icons/LogOutIcon'
import { ActiveSesion } from '../ActiveSession'

type Props = {
  ip: string
  device: string
  osName: string
  osVersion: string
  lastVisit: string
  id:number
}

export const Device = ({ device, ip, osName, osVersion, lastVisit, id }: Props) => {
  const sessionDevice = device || 'Desctop'
  return (
    <Card className={s.cardRoot}>
      <div className={s.wrapperSession}>
        <div className={s.sessionLeft}>
          <ActiveSesion name={sessionDevice} />
          <div>
            <Typography className={s.nameDevice} variant="bold_text_16">
              {osName} {osVersion}
            </Typography>
            <Typography variant="regular_text_14">IP:{ip}</Typography>
            <Typography variant="small_text">
              Last visit: {new Date(lastVisit).toLocaleDateString('ru-RU')}
            </Typography>
          </div>
        </div>
        <div>
          <Button variant={'text'} className={s.logoutBtn}>
            <LogOutIcon /> <span>Log Out</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
