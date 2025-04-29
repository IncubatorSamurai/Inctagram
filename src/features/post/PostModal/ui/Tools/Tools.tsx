import { EditOutlineIcon } from '@/shared/assets/icons/EditOutlineIcon'
import { TrashOutlineIcon } from '@/shared/assets/icons/TrashOutlineIcon'
import { Typography } from '@/shared/ui/typography'
import s from './Tools.module.scss'
import { CopyIcon } from '@/shared/assets/icons/CopyIcon'
import { PersonRemoveOutlineIcon } from '@/shared/assets/icons/PersonRemoveOutlineIcon'

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
      {isOwner ? (
        <>
          <div className={s.nav_tools_label} onClick={handler}>
            <EditOutlineIcon />
            <Typography variant="regular_text_14">{'Edit Post'}</Typography>
          </div>
          <div className={s.nav_tools_label} onClick={deletePostHandler}>
            <TrashOutlineIcon />
            <Typography variant="regular_text_14">{'Delete Post'} </Typography>
          </div>
        </>
      ) : (
        <>
          <div className={s.nav_tools_label} onClick={handler}>
            <PersonRemoveOutlineIcon />
            <Typography variant="regular_text_14">{'Unfollow'}</Typography>
          </div>
          <div className={s.nav_tools_label} onClick={deletePostHandler}>
            <CopyIcon />
            <Typography variant="regular_text_14">{'Copy Link'} </Typography>
          </div>
        </>
      )}
    </div>
  )
}
