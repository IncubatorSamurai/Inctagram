import { DialogClose, Modal } from '@/shared/ui/modal'
import s from './ModalClosePost.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
import { useDeletePostMutation } from '@/shared/api/post/postApi'
import { ErrorResponse } from '@/shared/types/auth'
import * as DialogRadix from '@radix-ui/react-dialog'

type ModalClosePostProps = {
  title: string
  open: boolean
  onOpenChange?: (isOpen: boolean) => void
  changeEdit?: () => void
  postId: number
}

export const ModalCloseOrDeletePost = ({
  postId,
  title,
  open,
  onOpenChange = () => {},
  changeEdit = () => {},
}: ModalClosePostProps) => {
  const [deletePost] = useDeletePostMutation()
  const handler = () => {
    onOpenChange(true)
    changeEdit()
  }
  const deletePostHandler = async () => {
    try {
      await deletePost({ id: postId }).unwrap()
    } catch (error) {
      const err = error as ErrorResponse
      console.error(err.data.messages)
    }
  }

  return (
    <Modal
      className={s.modal}
      open={open}
      onOpenChange={onOpenChange}
      aria-describedby="modalDescription"
      title={`${title} Post?`}
    >
      <div className={s.container}>
        <DialogRadix.Title className={s.DialogTitle}>
          <Typography variant="regular_text_16" id="modalDescription">
            {title === 'Delete' && ` Are you sure you want to ${title} this post?`}
            {title === 'Close' &&
              ` Do you really want to close the edition of the publication? If you close changes won’t be saved`}
          </Typography>
        </DialogRadix.Title>

        <div className={s.btns}>
          <DialogClose asChild>
            <Button
              variant="outline"
              className={s.button}
              onClick={title === 'Delete' ? deletePostHandler : handler}
            >
              Yes
            </Button>
          </DialogClose>
          <Button variant="primary" className={s.button} onClick={() => onOpenChange(!open)}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}
