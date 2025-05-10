import { NotificationItem } from '@/shared/api/notifications/notificationsApi.types'
import io, { Socket } from 'socket.io-client'

class SocketApi {
  private static instance: SocketApi

  private socket: null | Socket = null
  private constructor() {}

  static getInstance() {
    if (!SocketApi.instance) {
      SocketApi.instance = new SocketApi()
    }
    return SocketApi.instance
  }

  connection(accessToken: string) {
    if (this.socket) return
    const queryParams = {
      query: {
        accessToken,
      },
      transports: ['websocket'],
    }
    this.socket = io('https://inctagram.work', queryParams)

    this.socket.on('connect', () => {
      console.log('Connection')
    })

    this.socket.on('disconnect', e => {
      console.log(`Disconnect ${e}`)
    })
  }
  disconnect() {
    this.socket?.disconnect()
    this.socket = null
  }
  subscribeNotifications(callback: (data: NotificationItem) => void) {
    this.socket?.on('notifications', callback)
  }
}
export default SocketApi
