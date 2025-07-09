export type SessionsGet = {
  current: Device
  others: Device[]
}

export type Device = {
  deviceId: number
  ip: string
  lastActive: string
  browserName: string
  browserVersion: string
  deviceName: string
  osName: string
  osVersion: string
  deviceType: string
}
