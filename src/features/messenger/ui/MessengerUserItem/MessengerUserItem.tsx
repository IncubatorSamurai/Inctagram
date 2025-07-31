import s from './MessengerUserItem.module.scss'
import Image from 'next/image'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import { Typography } from '@/shared/ui/typography'
import { Avatar } from '@/shared/api/post/postApi.types'

type MessengerUserItem = {
  id?: number
  userName: string
  ownerId?: number
  avatars: Avatar[]
  createdAt?: string
  messageText?: string
  onClick: () => void
  firstName?: string | null
  lastName?: string | null
  userSearch: boolean
  userId?: number
}
export const MessengerUserItem = ({
  userSearch,
  userId,
  userName,
  ownerId,
  avatars,
  createdAt,
  messageText,
  onClick,
  firstName,
  lastName,
}: MessengerUserItem) => {
  return (
    <li className={s.user_item} onClick={onClick}>
      {avatars?.[0]?.url ? (
        <Image src={avatars[0].url} width={48} height={48} alt="avatar" className={s.user_avatar} />
      ) : (
        <NoAvatar className={s.noAvatar} />
      )}
      {userSearch ? (
        <div>
          <Typography variant="bold_text_14">{userName}</Typography>
          <Typography variant="small_text">
            {firstName} {lastName}
          </Typography>
        </div>
      ) : (
        <div className={s.user_text_content}>
          <div className={s.user_item_name_date}>
            <Typography variant="bold_text_14">{userName ? userName : 'No Name'}</Typography>
            {createdAt && (
              <Typography variant="small_text">
                <span className={s.message_time}>
                  {new Date(createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </Typography>
            )}
          </div>
          <div>
            <Typography variant="small_text" className={s.message_last_text}>
              {ownerId === userId ? 'You: ' : ''}
              {messageText}
            </Typography>
          </div>
        </div>
      )}
    </li>
  )
}
