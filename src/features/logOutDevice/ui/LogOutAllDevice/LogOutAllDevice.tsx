import { useDeleteAllDevicesMutation } from '@/shared/api/devices/devicesApi'
import { Button } from '@/shared/ui/button'
import { useTranslations } from 'next-intl'

export const LogOutAllDevice = () => {
  const [deleteAllDevices] = useDeleteAllDevicesMutation()

  const tabTranslation = useTranslations('profile.profileSettingsTabs')

  return (
    <Button variant="outline" onClick={() => deleteAllDevices()}>
      {tabTranslation('logOutAllDevices')}
    </Button>
  )
}
