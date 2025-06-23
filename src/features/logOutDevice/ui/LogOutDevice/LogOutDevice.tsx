import { useDeleteSingleDeviceMutation, useGetAllDevicesQuery } from '@/shared/api/device/deviceApi'
import { Button } from '@/shared/ui/button'
import { LogOutIcon } from '@/shared/assets/icons/LogOutIcon'

type Props = {
  id: number
}
export const LogOutDevice = ({ id }: Props) => {
  const { data } = useGetAllDevicesQuery({})
  const [deleteAllDevices] = useDeleteSingleDeviceMutation()
  console.log(data)

  return (
    <Button onClick={() => deleteAllDevices(id)} variant="icon">
      <LogOutIcon /> Log Out
    </Button>
  )
}
