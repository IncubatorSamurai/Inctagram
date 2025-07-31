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
  private socket: Socket | null = null

  private constructor() {}

  static getInstance() {
    if (!SocketApi.instance) {
      SocketApi.instance = new SocketApi()
    }
    return SocketApi.instance
  }

  connection(accessToken: string) {
    if (this.socket) {
      console.log('[WS] 🔁 Уже подключено')
      return
    }

    console.log('[WS] Подключение...')
    const queryParams = {
      query: {
        accessToken,
      },
      transports: ['websocket'],
    }

    this.socket = io('https://inctagram.work', queryParams)

    this.socket.on('connect', () => {
      console.log('[WS] ✅ Подключено:', this.socket?.id)
    })

    this.socket.on('disconnect', reason => {
      console.log('[WS] ❌ Отключено. Причина:', reason)
    })
  }

  disconnect() {
    if (this.socket) {
      console.log('[WS] ❌ Отключение WebSocket...')
      this.socket.disconnect()
      this.socket = null
    }
  }

  subscribeNotifications(callback: (data: NotificationItem) => void) {
    this.socket?.on('notifications', callback)
  }

  unsubscribeNotifications(callback: (data: NotificationItem) => void) {
    this.socket?.off('notifications', callback)
  }

  subscribeReceiveMessage(callback: (data: Message) => void) {
    this.socket?.on(WS_EVENT_PATH.RECEIVE_MESSAGE, message => {
      console.log('[WS] ✅ RECEIVE_MESSAGE:', message)
      callback(message)
    })
  }

  subscribeMessageSend(callback: (data: Message) => void) {
    this.socket?.on(WS_EVENT_PATH.MESSAGE_SEND, message => {
      console.log('[WS] 📩 Message received from another user:', message)

      this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, {
        message,
        receiverId: message.receiverId,
      })
      console.log(message.status)
      callback(message)
    })
  }

  subscribeMessageUpdate(callback: (data: Message) => void) {
    this.socket?.on(WS_EVENT_PATH.UPDATE_MESSAGE, callback)
  }

  subscribeMessageDeleted(callback: (messageId: number) => void) {
    this.socket?.on(WS_EVENT_PATH.MESSAGE_DELETED, callback)
  }

  sendMessage(data: MessageSendRequest) {
    this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, data)
  }

  updateMessage(data: MessageUpdateRequest) {
    this.socket?.emit(WS_EVENT_PATH.UPDATE_MESSAGE, data)
  }

  deleteMessage(messageId: number) {
    this.socket?.emit(WS_EVENT_PATH.MESSAGE_DELETED, messageId)
  }
}

export default SocketApi
