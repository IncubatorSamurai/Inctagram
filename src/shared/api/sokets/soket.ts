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
  private refCount: number = 0

  private constructor() {}

  static getInstance() {
    if (!SocketApi.instance) {
      SocketApi.instance = new SocketApi()
    }
    return SocketApi.instance
  }

  connection(accessToken: string) {
    if (this.socket) {
      this.refCount++
      console.log('[WS] 🔁 Повторное подключение, refCount =', this.refCount)
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
    this.refCount = 1

    this.socket.on('connect', () => {
      console.log('[WS] ✅ Подключено:', this.socket?.id)
    })

    this.socket.on('disconnect', reason => {
      console.log('[WS] ❌ Отключено. Причина:', reason)
    })
  }

  disconnect() {
    this.refCount--
    console.log('[WS] 🔻 Уменьшили refCount:', this.refCount)

    if (this.refCount <= 0) {
      console.log('[WS] ❌ Отключение WebSocket вручную...')
      this.socket?.disconnect()
      this.socket = null
      this.refCount = 0
    }
  }

  subscribeNotifications(callback: (data: NotificationItem) => void) {
    this.socket?.on('notifications', callback)
  }
  unsubscribeNotifications(callback: (data: NotificationItem) => void) {
    this.socket?.off('notifications', callback)
  }
  subscribeReceiveMessage(callback: (data: Message) => void) {
    this.socket?.on(WS_EVENT_PATH.RECEIVE_MESSAGE, callback)
  }

  // subscribeMessageSend(callback: (data: Message) => void) {
  //   this.socket?.on(WS_EVENT_PATH.MESSAGE_SEND, callback)
  // }
  subscribeMessageSend(callback: (data: Message) => void) {
    this.socket?.on(WS_EVENT_PATH.MESSAGE_SEND, message => {
      console.log('[WS] 📩 Message received from another user:', message)

      // 🔁 Подтверждаем получение — это критично
      this.socket?.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, {
        message,
        receiverId: message.receiverId,
      })

      // ✅ Прокидываем дальше в логику приложения (например, onCacheEntryAdded)
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

  updateMessageStatus(messageId: number, status: 'SENT' | 'RECEIVED' | 'READ') {
    this.socket?.emit(WS_EVENT_PATH.UPDATE_MESSAGE, { id: messageId, status })
  }
}

export default SocketApi
