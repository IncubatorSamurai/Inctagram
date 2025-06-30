import { Button } from '@/shared/ui/button'
import { LogOutIcon } from '@/shared/assets/icons/LogOutIcon'
import { useDeleteSingleDeviceMutation } from '@/shared/api/devices/devicesApi'
import { useTranslations } from 'next-intl'

type Props = {
  id: number
}
export const LogOutDevice = ({ id }: Props) => {
  const [deleteSingleDevice] = useDeleteSingleDeviceMutation()

  const tabTranslation = useTranslations('profile.profileSettingsTabs')

  return (
    <Button onClick={() => deleteSingleDevice(id)} variant="icon">
      <LogOutIcon /> {tabTranslation('logOutSingleDevice')}
    </Button>
  )
}
