import { useDeleteAllDevicesMutation } from '@/shared/api/device/deviceApi'
import { Button } from '@/shared/ui/button'

export const LogOutAllDevice = () => {
  const [deleteAllDevices] = useDeleteAllDevicesMutation()

  return (
    <Button variant="outline" onClick={() => deleteAllDevices()}>
      Terminate all other session
    </Button>
  )
}
