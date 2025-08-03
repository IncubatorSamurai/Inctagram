import s from './MessengerTextField.module.scss'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Message } from '@/shared/api/messenger/messengerApiType'

type MessengerTextFieldProps = {
  messageText: string
  editingMessage: Message | null
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSend: () => void
  onEdit: () => void
  onCancelEdit: () => void
}

export const MessengerTextField = ({
  messageText,
  editingMessage,
  onKeyDown,
  onChange,
  onSend,
  onEdit,
  onCancelEdit,
}: MessengerTextFieldProps) => {
  return (
    <div className={s.messenger_chat_textarea}>
      <Input
        type="text"
        placeholder="Type a message"
        value={messageText}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {editingMessage ? (
        <>
          <Button variant="text" onClick={onEdit} disabled={!messageText.trim()}>
            Save
          </Button>
          <Button variant="text" onClick={onCancelEdit}>
            Cancel
          </Button>
        </>
      ) : (
        <Button variant="text" onClick={onSend} disabled={!messageText.trim()}>
          Send message
        </Button>
      )}
    </div>
  )
}
