'use client'
import { MoreHorizontalIcon } from '@/shared/assets/icons/MoreHorizontalIcon'
import s from './RightSideHeader.module.scss'
import { Typography } from '@/shared/ui/typography'
import { useState } from 'react'
import { Tools } from '../Tools/Tools'

type RightSideHeaderProps = {
  changeEdit: () => void
  isOpenEdit: boolean
  showDeleteModalHandler: () => void
}

export const RightSideHeader = ({
  changeEdit,
  isOpenEdit,
  showDeleteModalHandler,
}: RightSideHeaderProps) => {

  const [openTools, setOpenTools] = useState(false)
  const openCloseToolsHadler = () => {
    setOpenTools(!openTools)
  }

  const userImg =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8VbvTvQFYrD7AYI3IKB8rdP-vvYm2LkBl-w&s'
  return (
    <div className={s.postsSideHeader}>
      <div className={s.imgAndURLProfile}>
        <img src={userImg} className={s.userAvatar} alt="userAvatar" />
        <Typography variant="h3">URLProfiele</Typography>
      </div>
      <div className={s.tools} onBlur={() => setOpenTools(false)} tabIndex={0}>
        {!isOpenEdit && <MoreHorizontalIcon onClick={() => setOpenTools(!openTools)} />}
        {openTools && (
          <Tools
            changeEdit={changeEdit}
            openClose={openCloseToolsHadler}
            showDeleteModalHandler={showDeleteModalHandler}
          />
        )}
      </div>
    </div>
  )
}
