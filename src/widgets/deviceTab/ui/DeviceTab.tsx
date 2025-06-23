import { useGetAllDevicesQuery } from '@/shared/api/device/deviceApi'
import s from './DeviceTab.model.scss'
import { LogOutAllDevice, LogOutDevice } from '@/features/logOutDevice'

export const DeviceTab = () => {
	const {data} =useGetAllDevicesQuery({})

	console.log(data)
  return <div>device tab
	<LogOutAllDevice/>
	<LogOutDevice/>

  </div>
}
