'use client'

import { useEffect, useState } from 'react'
import s from './MessengerData.module.scss'
import { Input } from '@/shared/ui/input'
import { Scrollbar } from '@/shared/ui/scrollbar'
import { Button } from '@/shared/ui/button/Button'
import Image from 'next/image'
import { v4 } from 'uuid'
import {
  useDeleteMessageMutation,
  useGetLatestMessagesQuery,
  useLazyGetMessagesByUserQuery,
} from '@/shared/api/messenger/messengerApi'
import { useGetUsersQuery } from '@/shared/api/users/usersApi'
import SocketApi from '@/shared/api/sokets/soket'
import { Message } from '@/shared/api/messenger/messengerApiType'
import { Typography } from '@/shared/ui/typography'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { Avatar } from '@/shared/api/post/postApi.types'
import {
  selectSelectedUserAvatar,
  selectSelectedUserId,
  selectSelectedUserName,
} from '@/shared/store/messengerSlice/messengerSlice'
import { useAppSelector } from '@/shared/hooks'
import { MessengerUserItem } from '@/features/messenger/ui/MessengerUserItem/MessengerUserItem'
import { MessageItem } from '@/features/messenger/ui/MessageItem/MessageItem'
import { toast } from 'react-toastify'

export const MessengerData = () => {
  const [searchUser, setSearchUser] = useState('')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [messageText, setMessageText] = useState('')
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)

  const selectedUserIdFromStore = useAppSelector(selectSelectedUserId)
  const selectedUserNameFromStore = useAppSelector(selectSelectedUserName)
  const selectedUserAvatarFromStore = useAppSelector(selectSelectedUserAvatar)
  const userId = Number(localStorage.getItem('userId'))
  const { data: chatList, refetch: refetchChat } = useGetLatestMessagesQuery({ pageSize: 12 })
  const { data: usersData } = useGetUsersQuery({ pageNumber: 1, pageSize: 1000 })
  const allUsers = usersData?.items || []

  const [deleteMessage] = useDeleteMessageMutation()
  const [getMessagesByUser, { data: messagesData, isFetching }] = useLazyGetMessagesByUserQuery()

  const handleSelectUser = async (userId: number, userName: string, avatar: Avatar[]) => {
    setSelectedUserId(userId)
    setName(userName)
    setAvatar(avatar?.[0]?.url || '')
    setEditingMessage(null)
    setMessageText('')
    setSearchUser('')
    await getMessagesByUser({ dialoguePartnerId: userId })
  }

  useEffect(() => {
    if (selectedUserIdFromStore) {
      setSelectedUserId(selectedUserIdFromStore)
      setName(selectedUserNameFromStore)
      setAvatar(selectedUserAvatarFromStore[0]?.url || '')
      getMessagesByUser({ dialoguePartnerId: selectedUserIdFromStore })
    }
  }, [selectedUserIdFromStore])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(searchUser.trim().toLowerCase())
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchUser])

  const handleDeleteMessage = async (messageId: number, dialoguePartnerId: number) => {
    try {
      await deleteMessage({ id: messageId, dialoguePartnerId }).unwrap()
      toast.success('Message deleted successfully')
    } catch (error) {
      toast.error('Ошибка при удалении сообщения:', error!)
    }
  }

  const handleSendMessage = async () => {
    const ws = SocketApi.getInstance()
    if (!selectedUserId || !messageText.trim()) return
    if (selectedUserId === userId) {
      toast.error('Нельзя отправить сообщение самому себе')
      return
    }
    const trimmed = messageText.trim()
    ws.sendMessage({ receiverId: selectedUserId, message: trimmed })
    setMessageText('')
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

  const filteredUsers = debouncedValue
    ? allUsers.filter(user => user.userName?.toLowerCase().startsWith(debouncedValue))
    : []

  return (
    <section className={s.messenger}>
      <h2 className={s.messenger_title}>Messenger</h2>
      <div className={s.messanger_container}>
        <div className={s.messenger_users}>
          <div className={s.messenger_user_header}>
            <Input
              type="search"
              placeholder="Input search"
              value={searchUser}
              onChange={e => setSearchUser(e.target.value)}
            />
          </div>
          <div className={s.messanger_users_list}>
            <Scrollbar orientation="vertical">
              <ul className={s.messanger_list}>
                {debouncedValue && filteredUsers.length > 0
                  ? filteredUsers.map(user => (
                      <MessengerUserItem
                        key={v4()}
                        onClick={() => handleSelectUser(user.id, user.userName, user.avatars)}
                        avatars={user.avatars}
                        userSearch={true}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        userName={user.userName}
                      />
                    ))
                  : chatList?.items.map(chat => (
                      <MessengerUserItem
                        key={v4()}
                        id={chat.id}
                        userSearch={false}
                        userName={chat.userName}
                        avatars={chat.avatars}
                        createdAt={chat.createdAt}
                        messageText={chat.messageText}
                        ownerId={chat.ownerId}
                        onClick={() =>
                          handleSelectUser(chat.receiverId, chat.userName, chat.avatars)
                        }
                      />
                    ))}
              </ul>
            </Scrollbar>
          </div>
        </div>

        <div className={s.messenger_content}>
          <div className={s.messenger_content_header}>
            {selectedUserId ? (
              <>
                {avatar ? (
                  <Image
                    src={avatar}
                    width={48}
                    height={48}
                    alt="avatar"
                    className={s.user_avatar}
                  />
                ) : (
                  <NoAvatar className={s.noAvatar} />
                )}
                <span>{name}</span>
              </>
            ) : (
              <div>Choose your friend</div>
            )}
          </div>

          <div className={s.messenger_content_chat}>
            {isFetching ? (
              <p>Загрузка сообщений...</p>
            ) : messagesData?.items.length ? (
              <Scrollbar orientation="vertical">
                <ul className={s.messenger_content_list}>
                  {messagesData.items.map(message => (
                    <MessageItem
                      key={v4()}
                      id={message.id}
                      messageText={message.messageText}
                      status={message.status}
                      createdAt={message.createdAt}
                      onEdit={() => {
                        setEditingMessage(message)
                        setMessageText(message.messageText)
                      }}
                      onDelete={() => handleDeleteMessage(message.id, selectedUserId!)}
                    />
                  ))}
                </ul>
              </Scrollbar>
            ) : (
              <div className={s.empty_chat}>
                <Typography variant={'medium_text_14'}>
                  {name ? `Write your message to ${name}` : 'Choose who you would like to talk to'}
                </Typography>
              </div>
            )}

            <div className={s.messenger_chat_textarea}>
              <Input
                type="text"
                placeholder="Type a message"
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {editingMessage ? (
                <>
                  <Button variant="text" onClick={handleEditMessage} disabled={!messageText.trim()}>
                    Save
                  </Button>
                  <Button variant="text" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="text" onClick={handleSendMessage} disabled={!messageText.trim()}>
                  Send message
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
