import { useGetAllDevicesQuery } from '@/shared/api/device/deviceApi'
import { LogOutAllDevice, LogOutDevice } from '@/features/logOutDevice'

export const DeviceTab = () => {
  const { data } = useGetAllDevicesQuery({})

  console.log(data)
  return (
    <div>
      <LogOutAllDevice />
      {/* TODO: вставь нужное id */}
      <LogOutDevice id={1} />
    </div>
  )
}
