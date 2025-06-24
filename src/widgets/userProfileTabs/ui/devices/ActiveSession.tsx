import { DesktopIcon } from '@/shared/assets/icons/DesktopIcon'
import { PhoneIcon } from '@/shared/assets/icons/PhoneIcon'

type ActiveSes = {
  name: string
}

export const ActiveSesion = ({ name }: ActiveSes) => {
  return (
    <div>
      {name === 'Desctop' && <DesktopIcon />}
      {name === 'mobile' && <PhoneIcon />}
      {/* {name === 'tablet' && <MicrosoftEdgeIcon />} */}
    </div>
  )
}
