import s from './MessageItem.module.scss'
import { Typography } from '@/shared/ui/typography'
import { CheckMarkOutlineIcon } from '@/shared/assets/icons/CheckMarkOutlineIcon'
import { DoneAllOutlineIcon } from '@/shared/assets/icons/DoneAllOutlineIcon'
import { Button } from '@/shared/ui/button'
import { EditIcon } from '@/shared/assets/icons/EditIcon'
import { CloseIcon } from '@/shared/assets/icons/CloseIcon'

type MessageItemProp = {
  id: number
  messageText?: string
  createdAt: string
  status: string
  onEdit: () => void
  onDelete: () => void
  isMyMessage: boolean
}
export const MessageItem = ({
  id,
  messageText,
  createdAt,
  status,
  onDelete,
  onEdit,
  isMyMessage,
}: MessageItemProp) => {
  return (
    <li key={id} className={`${s.message_item} ${isMyMessage ? s.my_message : ''}`}>
      <Typography variant={'regular_text_14'}>{messageText}</Typography>
      <div className={s.message_date}>
        <Typography variant={'small_text'} asChild>
          <span className={s.message_time}>
            {new Date(createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </Typography>
        <span className={s.message_status}>
          {status === 'SENT' && (
            <>
              <CheckMarkOutlineIcon /> SENT <>{status}</>
            </>
          )}
          {(status === 'RECEIVED' || status === 'READ') && (
            <>
              <DoneAllOutlineIcon /> RECIVED
            </>
          )}
        </span>
      </div>
      {isMyMessage && (
        <>
          <Button variant="icon" className={s.message_edit} onClick={onEdit}>
            <EditIcon />
          </Button>

          <Button variant="icon" className={s.close_message} onClick={onDelete}>
            <CloseIcon />
          </Button>
        </>
      )}
    </li>
  )
}

MessageItem.displayName = 'MessageItem'
