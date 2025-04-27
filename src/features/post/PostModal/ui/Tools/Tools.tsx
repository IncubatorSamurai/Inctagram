import { EditOutlineIcon } from '@/shared/assets/icons/EditOutlineIcon'
import { TrashOutlineIcon } from '@/shared/assets/icons/TrashOutlineIcon'
import { Typography } from '@/shared/ui/typography'
import s from './Tools.module.scss'

type ToolsProps = {
  changeEdit: () => void
  openClose: () => void
  showDeleteModalHandler: () => void
  isOwner: boolean
}

export const Tools = ({ isOwner, changeEdit, openClose, showDeleteModalHandler }: ToolsProps) => {
  const handler = () => {
    changeEdit()
    openClose()
  }

  const deletePostHandler = () => {
    openClose()
    showDeleteModalHandler()
  }

  return (
    <div className={s.nav_tools}>
      <div className={s.nav_tools_label} onClick={handler}>
        <EditOutlineIcon />
        <Typography variant="regular_text_14">{isOwner ? 'Edit Post' : 'Unfollow'}</Typography>
      </div>
      <div className={s.nav_tools_label} onClick={deletePostHandler}>
        <TrashOutlineIcon />
        <Typography variant="regular_text_14">{isOwner ? 'Delete Post' : 'Copy Link'} </Typography>
      </div>
    </div>
  )
}
