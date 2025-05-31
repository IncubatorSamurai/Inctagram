import { Button } from '@/shared/ui/button'
import s from './AddComment.module.scss'
import clsx from 'clsx'

type AddContent = {
  placeholder?: string
  onPublish?: () => void
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: () => void
  className?: string
}
export const AddContent = ({ className, value, onChange, placeholder, onPublish }: AddContent) => {
  return (
    <div className={clsx(s.postsSideAddComment, className)}>
      <textarea
        value={value}
        onChange={onChange}
        maxLength={300}
        placeholder={`Add a ${placeholder}...`}
      ></textarea>
      <Button
        onMouseDown={e => e.preventDefault()}
        onClick={onPublish}
        name="Publish"
        variant="text"
      >
        Publish
      </Button>
    </div>
  )
}
