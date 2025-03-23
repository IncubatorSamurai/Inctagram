'use client'
import s from './PostModal.module.scss'
import { Button } from '@/shared/ui/button'
import { PostModalNew } from './PostModalNew/PostModalNew'
import { ModalCloseOrDeletePost } from './ModalCloseDeletePost/ModalCloseDeletePost'

import { RightSideHeader } from './RightSideHeader/RightSideHeader'

import { PostContent } from './PostContent/PostContent'
import { EditDescriptionPost } from './EditDescriptionPost/EditDiscriptionPost'
import { useState } from 'react'

export const PostModal = () => {
  const imgSlider = 'https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg'
  //тут нужно состояние за управление включен ли эдитМод
  //1 нажимаю на эдит пост в тулзах и состояние isOpenEdit меняется
  // появляется полоса с Edit Post и Х
  // пропадает иконка для вызова тулзов
  // появляется компонента с редактированием поста
  //  TODO , докрутит управление

  // state for textareaValue
  const [post, setPost] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  )

  const saveTextAreaValue = (value: string) => {
    setPost(value)
  }

  //стейт для включение эдит мода
  const [openEdit, setOpenEdit] = useState(false)
  //handler close EdiMode
  const changeEdit = () => {
    setOpenEdit(!openEdit)
    console.log('closeOpenEditMOd')
  }

  // нужен стейт который показывает модалку для закрытия и если в нем нажмут да, закрывает едит мод
  //это открывает нашу модалку НУЖНО
  const [openModal, setOpenModal] = useState(false)
  const changeOpen = () => {
    setOpenModal(!openModal)
    console.log('yes close')
  }

  // state for deleteModal
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const showDeleteModalHandler = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  return (
    <PostModalNew
      isOpenEdit={openEdit}
      title="Edit Post"
      trigger={<Button>trigger for modal</Button>}
      changeEdit={changeOpen}
    >
      <div className={s.root}>
        <div className={s.leftSide}>
          <img src={imgSlider} alt="sliderImg" />
        </div>
        <div className={s.rightSide}>
          <RightSideHeader
            changeEdit={changeEdit}
            isOpenEdit={openEdit}
            showDeleteModalHandler={showDeleteModalHandler}
          />
          {/* если включен эдит мод показываем текстареа иначе посты */}
          {openEdit ? (
            <EditDescriptionPost
              post={post}
              saveValue={saveTextAreaValue}
              changeEdit={changeEdit}
            />
          ) : (
            <PostContent post={post} />
          )}
        </div>
      </div>
      {openModal && (
        <ModalCloseOrDeletePost
          title="Close"
          open={openModal}
          onOpenChange={changeOpen}
          changeEdit={changeEdit}
        />
      )}
      {showDeleteModal && (
        <ModalCloseOrDeletePost
          title="Delete"
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
        />
      )}
    </PostModalNew>
  )
}
