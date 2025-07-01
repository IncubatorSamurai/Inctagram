import { Avatar } from '@/shared/api/post/postApi.types'

export enum WS_EVENT_PATH {
  RECEIVE_MESSAGE = 'receive-message',
  MESSAGE_SEND = 'message-send',
  UPDATE_MESSAGE = 'update-message',
  MESSAGE_DELETED = 'message-deleted',
  ERROR = 'error',
}
export enum MessageStatus {
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  READ = 'READ',
}
export type MessageStatusUpdateRequestVariant = {
  id: number
  status: 'SENT' | 'RECEIVED' | 'READ'
}
export type MessageStatusUpdateRequest = {
  ids: number[]
}
export type MessageSendRequest = {
  message: string
  receiverId: number
}

export type MessageUpdateRequest = {
  id: number
  message: string
}

export type Message = {
  id: number
  ownerId: number
  receiverId: number
  messageText: string
  status: MessageStatus
  messageType: string
  createdAt: string
  updatedAt: string
  userName: string
  avatars: Avatar[]
}

export type SocketError = {
  message: string
  error: 'RECEIVE_MESSAGE' | 'UPDATE_MESSAGE' | 'MESSAGE_SEND' | 'MESSAGE_DELETED' | string
}
