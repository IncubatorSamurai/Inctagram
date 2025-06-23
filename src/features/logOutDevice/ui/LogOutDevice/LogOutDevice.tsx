import { useDeleteSingleDeviceMutation, useGetAllDevicesQuery } from '@/shared/api/device/deviceApi'
import s from './LogOutDevice.module.scss'
import { Button } from '@/shared/ui/button'
import { LogOutIcon } from '@/shared/assets/icons/LogOutIcon'

export const LogOutDevice = () => {
  const { data } = useGetAllDevicesQuery({})
  const [deleteAllDevices] = useDeleteSingleDeviceMutation()
  console.log(data)

  const logOut = () => {
    deleteAllDevices(data.others[0].deviceId)
  }
  return (
    <Button onClick={logOut} variant="icon">
      {' '}
      <LogOutIcon /> Log Out
    </Button>
  )
}
