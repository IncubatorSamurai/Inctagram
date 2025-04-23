import { Button } from '@/shared/ui/button'
import s from './AddComment.module.scss'
export const AddComment = () => {
  return (
    <div className={s.postsSideAddComment}>
      <textarea maxLength={500} placeholder="Add a Comment..."></textarea>
      <Button name="Publish" variant="text">
        Publish
      </Button>
    </div>
  )
}
