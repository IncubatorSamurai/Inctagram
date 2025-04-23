'use client'
import { MoreHorizontalIcon } from '@/shared/assets/icons/MoreHorizontalIcon'
import s from './RightSideHeader.module.scss'
import { Typography } from '@/shared/ui/typography'
import { useState } from 'react'
import { Tools } from '../Tools/Tools'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'

type RightSideHeaderProps = {
  changeEdit: () => void
  isOpenEdit: boolean
  showDeleteModalHandler: () => void
  postUserName: string | undefined
}

export const RightSideHeader = ({
  postUserName,
  changeEdit,
  isOpenEdit,
  showDeleteModalHandler,
}: RightSideHeaderProps) => {
  const [openTools, setOpenTools] = useState(false)
  const openCloseToolsHadler = () => {
    setOpenTools(!openTools)
  }

  return (
    <div className={s.postsSideHeader}>
      {/* добавить условие по которому показывается если это наш пост то показываем шапку иначе нет*/}
      <div className={s.imgAndURLProfile}>
        <NoAvatar className={s.userAvatar} />
        <Typography variant="h3">{postUserName}</Typography>
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
