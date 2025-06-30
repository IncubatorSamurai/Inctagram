import { DesktopIcon } from '@/shared/assets/icons/DesktopIcon'
import { PhoneIcon } from '@/shared/assets/icons/PhoneIcon'

type ActiveSes = {
  name: string
}

export const ActiveSession = ({ name }: ActiveSes) => {
  return (
    <div>
      {name === 'Desktop' && <DesktopIcon />}
      {name === 'mobile' && <PhoneIcon />}
      {/* {name === 'tablet' && <MicrosoftEdgeIcon />} */}
    </div>
  )
}
