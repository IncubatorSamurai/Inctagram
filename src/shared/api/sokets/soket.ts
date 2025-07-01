import { NotificationItem } from '@/shared/api/notifications/notificationsApi.types'
import io, { Socket } from 'socket.io-client'
import {
  Message,
  MessageSendRequest,
  MessageUpdateRequest,
  WS_EVENT_PATH,
} from '@/shared/api/messenger/messengerApiType'

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

  subscribeReceiveMessage(callback: (data: Message) => void) {
    this.socket?.on(WS_EVENT_PATH.RECEIVE_MESSAGE, callback)
  }

  subscribeMessageSend(callback: (data: Message) => void) {
    this.socket?.on(WS_EVENT_PATH.MESSAGE_SEND, callback)
  }

  subscribeMessageUpdate(callback: (data: Message) => void) {
    this.socket?.on(WS_EVENT_PATH.UPDATE_MESSAGE, callback)
  }

  subscribeMessageDeleted(callback: (messageId: number) => void) {
    this.socket?.on(WS_EVENT_PATH.MESSAGE_DELETED, callback)
  }

  sendMessage(
    data: MessageSendRequest,
    ack?: (data: { message: Message; receiverId: number }) => void
  ) {
    this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, data, ack)
  }

  updateMessage(data: MessageUpdateRequest) {
    this.socket?.emit(WS_EVENT_PATH.UPDATE_MESSAGE, data)
  }
  deleteMessage(messageId: number) {
    this.socket?.emit(WS_EVENT_PATH.MESSAGE_DELETED, messageId)
  }
  updateMessageStatus(messageId: number, status: 'SENT' | 'RECEIVED' | 'READ') {
    this.socket?.emit(WS_EVENT_PATH.UPDATE_MESSAGE, { id: messageId, status })
  }
}
export default SocketApi
