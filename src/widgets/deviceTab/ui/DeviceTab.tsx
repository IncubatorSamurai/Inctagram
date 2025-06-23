import { LogOutAllDevice, LogOutDevice } from '@/features/logOutDevice'

export const DeviceTab = () => {

  return (
    <div>
      <LogOutAllDevice />
      {/* TODO: вставь нужное id */}
      <LogOutDevice id={1} />
    </div>
  )
}
