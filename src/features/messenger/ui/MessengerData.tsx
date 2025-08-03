'use client'

import { useEffect, useState } from 'react'
import s from './MessengerData.module.scss'
import { Input } from '@/shared/ui/input'
import { Scrollbar } from '@/shared/ui/scrollbar'
import Image from 'next/image'
import { v4 } from 'uuid'
import {
  useGetLatestMessagesQuery,
  useLazyGetMessagesByUserQuery,
} from '@/shared/api/messenger/messengerApi'
import { useGetUsersQuery } from '@/shared/api/users/usersApi'
import { Typography } from '@/shared/ui/typography'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import {
  selectSelectedUserAvatar,
  selectSelectedUserId,
  selectSelectedUserName,
  setSelectedUser,
} from '@/shared/store/messengerSlice/messengerSlice'
import { useAppDispatch, useAppSelector, useDebouncedEffect } from '@/shared/hooks'
import { MessengerUserItem } from '@/features/messenger/ui/MessengerUserItem/MessengerUserItem'
import { MessageItem } from '@/features/messenger/ui/MessageItem/MessageItem'
import { Loader } from '@/shared/ui/loader'
import { useMessagesLogic } from '@/shared/hooks/useMessageLogic'
import { MessengerTextField } from '@/features/messenger/ui/MessengerTextField/MessengerTextField'
import { Avatar } from '@/shared/api/post/postApi.types'
import { Message } from '@/shared/api/messenger/messengerApiType'

export const MessengerData = () => {
  const [searchUser, setSearchUser] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const selectedUserId = useAppSelector(selectSelectedUserId)
  const name = useAppSelector(selectSelectedUserName)
  const avatar = useAppSelector(selectSelectedUserAvatar)
  const userId = Number(localStorage.getItem('userId'))
  const dispatch = useAppDispatch()

  const { data: chatList, refetch: refetchChat } = useGetLatestMessagesQuery({ pageSize: 12 })
  const { data: usersData } = useGetUsersQuery({ pageNumber: 1, pageSize: 1000 })
  const allUsers = usersData?.items || []

  const [getMessagesByUser, { data: messagesData, isFetching }] = useLazyGetMessagesByUserQuery()
  const getPartnerId = (chat: Message): number => {
    return chat.ownerId === userId ? chat.receiverId : chat.ownerId
  }
  const handleSelectUser = async (userId: number, userName: string, avatars: Avatar[]) => {
    dispatch(
      setSelectedUser({
        id: userId,
        name: userName,
        avatar: avatars?.[0]?.url || '',
      })
    )
    setEditingMessage(null)
    setMessageText('')
    setSearchUser('')
    await getMessagesByUser({ dialoguePartnerId: userId })
  }

  useEffect(() => {
    if (selectedUserId) {
      getMessagesByUser({ dialoguePartnerId: selectedUserId })
    }
  }, [selectedUserId])

  useDebouncedEffect(
    () => {
      setDebouncedValue(searchUser.trim().toLowerCase())
    },
    [searchUser],
    300
  )

  const filteredUsers = debouncedValue
    ? allUsers.filter(user => user.userName?.toLowerCase().startsWith(debouncedValue))
    : []

  const {
    messageText,
    setMessageText,
    editingMessage,
    setEditingMessage,
    handleSendMessage,
    handleEditMessage,
    handleDeleteMessage,
    handleKeyDown,
    handleCancelEdit,
  } = useMessagesLogic(selectedUserId, userId, chatList, refetchChat)

  return (
    <section className={s.messenger}>
      <h2 className={s.messenger_title}>Messenger</h2>
      <div className={s.messenger_container}>
        <div className={s.messenger_users}>
          <div className={s.messenger_user_header}>
            <Input
              type="search"
              placeholder="Input search"
              value={searchUser}
              onChange={e => setSearchUser(e.target.value)}
            />
          </div>
          <div className={s.messenger_users_list}>
            <Scrollbar orientation="vertical">
              <ul className={s.messenger_list}>
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
                        userId={userId}
                        id={chat.id}
                        userSearch={false}
                        userName={chat.userName}
                        avatars={chat.avatars}
                        createdAt={chat.createdAt}
                        messageText={chat.messageText}
                        ownerId={chat.ownerId}
                        onClick={() =>
                          handleSelectUser(getPartnerId(chat), chat.userName, chat.avatars)
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
              <div className={s.chat_loader}>
                <Loader />
              </div>
            ) : messagesData?.items.length ? (
              <Scrollbar orientation="vertical">
                <ul className={s.messenger_content_list}>
                  {messagesData.items.map(message => (
                    <MessageItem
                      key={v4()}
                      id={message.id}
                      messageText={message.messageText}
                      status={message.status}
                      isMyMessage={message.ownerId === userId}
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

            <MessengerTextField
              messageText={messageText}
              editingMessage={editingMessage}
              onChange={e => setMessageText(e.target.value)}
              onSend={handleSendMessage}
              onEdit={handleEditMessage}
              onCancelEdit={handleCancelEdit}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
