'use client'

import { useEffect, useState } from 'react'
import s from './MessengerData.module.scss'
import { Input } from '@/shared/ui/input'
import { Scrollbar } from '@/shared/ui/scrollbar'
import { Button } from '@/shared/ui/button/Button'
import Image from 'next/image'
import {
  useDeleteMessageMutation,
  useGetLatestMessagesQuery,
  useLazyGetMessagesByUserQuery,
  useSendMessageMutation,
} from '@/shared/api/messenger/messengerApi'
import { useGetUsersQuery } from '@/shared/api/users/usersApi'
import SocketApi from '@/shared/api/sokets/soket'
import { Message } from '@/shared/api/messenger/messengerApiType'
import { Typography } from '@/shared/ui/typography'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { Avatar } from '@/shared/api/post/postApi.types'
import {
  clearSelectedUser,
  selectSelectedUserAvatar,
  selectSelectedUserId,
  selectSelectedUserName,
} from '@/shared/store/messengerSlice/messengerSlice'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { MessengerUserItem } from '@/features/messenger/ui/MessengerUserItem/MessengerUserItem'
import { MessageItem } from '@/features/messenger/ui/MessageItem/MessageItem'

export const MessengerData = () => {
  const [searchUser, setSearchUser] = useState('')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [messageText, setMessageText] = useState('')

  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const { data: chatList } = useGetLatestMessagesQuery({
    pageSize: 12,
  })

  const { data: usersData } = useGetUsersQuery({ pageNumber: 1, pageSize: 1000 })
  const allUsers = usersData?.items || []

  const [deleteMessage] = useDeleteMessageMutation()
  const [getMessagesByUser, { data: messagesData, isFetching }] = useLazyGetMessagesByUserQuery()
  const [sendMessage] = useSendMessageMutation()
  const selectedUserIdFromStore = useAppSelector(selectSelectedUserId)

  const selectedUserNameFromStore = useAppSelector(selectSelectedUserName)
  const selectedUserAvatarFromStore = useAppSelector(selectSelectedUserAvatar)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!selectedUserId && selectedUserIdFromStore) {
      setSelectedUserId(selectedUserIdFromStore)
      setName(selectedUserNameFromStore)
      setAvatar(selectedUserAvatarFromStore)
      getMessagesByUser({ dialoguePartnerId: selectedUserIdFromStore })
      dispatch(clearSelectedUser())
    }
  }, [])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(searchUser.trim().toLowerCase())
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchUser])

  const handleSelectUser = async (userId: number, userName: string, avatar: Avatar[]) => {
    setSelectedUserId(userId)
    setName(userName)
    setAvatar(avatar?.[0]?.url || '')
    setEditingMessage(null)
    setMessageText('')
    setSearchUser('')
    await getMessagesByUser({ dialoguePartnerId: userId })
  }

  const handleDeleteMessage = async (messageId: number, dialoguePartnerId: number) => {
    try {
      await deleteMessage({ id: messageId, dialoguePartnerId }).unwrap()
    } catch (error) {
      console.error('Ошибка при удалении сообщения:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!selectedUserId || !messageText.trim()) return
    const trimmed = messageText.trim()
    setMessageText('')

    try {
      await sendMessage({
        receiverId: selectedUserId,
        message: trimmed,
      }).unwrap()

      await getMessagesByUser({ dialoguePartnerId: selectedUserId })
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error)
    }
  }

  const handleEditMessage = () => {
    if (!editingMessage || !messageText.trim()) return
    const ws = SocketApi.getInstance()
    ws.updateMessage({
      id: editingMessage.id,
      message: messageText.trim(),
    })
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
                        onClick={() => handleSelectUser(user.id, user.userName, user.avatars)}
                        avatars={user.avatars}
                        userSearch={true}
                        key={user.id}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        userName={user.userName}
                      />
                    ))
                  : chatList?.items.map(chat => (
                      <MessengerUserItem
                        key={chat.id}
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
              <div>Выберите пользователя</div>
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
                      key={message.id}
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
                  {name.length > 0
                    ? `Wright your message to ${name}`
                    : 'Choose who you would like to talk to'}
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
