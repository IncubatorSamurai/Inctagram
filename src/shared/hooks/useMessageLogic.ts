import { useState } from 'react'
import { messengerApi, useDeleteMessageMutation } from '@/shared/api/messenger/messengerApi'
import { Message, MessengerListResponse } from '@/shared/api/messenger/messengerApiType'
import SocketApi from '@/shared/api/sokets/soket'
import { toast } from 'react-toastify'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'

export const useMessagesLogic = (
  selectedUserId: number | null,
  userId: number,
  chatList: MessengerListResponse | undefined,
  refetchChat: () => void
) => {
  const dispatch = useAppDispatch()
  const [messageText, setMessageText] = useState('')
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [deleteMessage] = useDeleteMessageMutation()

  const handleSendMessage = async () => {
    const ws = SocketApi.getInstance()
    if (!selectedUserId || !messageText.trim()) return
    if (selectedUserId === userId) {
      toast.error('Нельзя отправить сообщение самому себе')
      return
    }
    const trimmedMessage = messageText.trim()
    ws.sendMessage({ receiverId: selectedUserId, message: trimmedMessage })
    setMessageText('')

    dispatch(messengerApi.util.invalidateTags([{ type: 'ChatHistory', id: selectedUserId }]))
    const chatExists = chatList?.items?.some(
      chat => chat.receiverId === selectedUserId || chat.ownerId === selectedUserId
    )
    if (!chatExists) await refetchChat()
  }

  const handleEditMessage = () => {
    if (!editingMessage || !messageText.trim()) return
    const ws = SocketApi.getInstance()
    ws.updateMessage({ id: editingMessage.id, message: messageText.trim() })
    setEditingMessage(null)
    setMessageText('')
  }

  const handleDeleteMessage = async (messageId: number, dialoguePartnerId: number) => {
    try {
      await deleteMessage({ id: messageId, dialoguePartnerId }).unwrap()
      toast.success('Message deleted successfully')
    } catch {
      toast.error('Ошибка при удалении сообщения')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (editingMessage) {
        handleEditMessage()
      } else {
        handleSendMessage()
      }
    }
  }

  const handleCancelEdit = () => {
    setEditingMessage(null)
    setMessageText('')
  }

  return {
    messageText,
    setMessageText,
    editingMessage,
    setEditingMessage,
    handleSendMessage,
    handleEditMessage,
    handleDeleteMessage,
    handleKeyDown,
    handleCancelEdit,
  }
}
