'use client'
import s from './PostModal.module.scss'
import { Button } from '@/shared/ui/button'
import { PostModalNew } from './PostModalNew/PostModalNew'
import { ModalCloseOrDeletePost } from './ModalCloseDeletePost/ModalCloseDeletePost'

import { RightSideHeader } from './RightSideHeader/RightSideHeader'

import { PostContent } from './PostContent/PostContent'
import { EditDescriptionPost } from './EditDescriptionPost/EditDiscriptionPost'
import { useCallback, useState } from 'react'
import { useGetPostByIdMutation } from '@/shared/api/post/postApi'
import { ResponseGetById } from '@/shared/api/post/postApi.types'
import { ErrorResponse } from '@/shared/types/auth'


type PostModalProps = {
  postId: number
}

export const PostModal = ({postId}:PostModalProps) => {
    const [getPostById] = useGetPostByIdMutation()

  const [post, setPost] = useState('')

  const saveTextAreaValue = (value: string) => {
    setPost(value)
  }


  const [openEdit, setOpenEdit] = useState(false)
  const changeEdit = () => {
    setOpenEdit(!openEdit)
  }

  const [openModal, setOpenModal] = useState(false)
  const changeOpen = () => {
    setOpenModal(!openModal)
  }


  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const showDeleteModalHandler = () => {
    setShowDeleteModal(!showDeleteModal)
  }


  const [res, setRes] = useState<ResponseGetById | null>()
  // const postId = 1081 //5723 //1081 //берем айдишник из урла 
const getPostHandler = useCallback(async () => {
  try {
    const result = await getPostById({ id: postId }).unwrap();
    setRes(result);
    setPost(result.description)
  } catch (error) {
    const err = error as ErrorResponse
    console.error(err.data.messages)
  }
}, [getPostById]);

// const showSlider = res?.images.length > 1 ? true : false
// console.log(res?.images.length);
// нужно достать айдишник поста и пробросить для функций удаление/редактирование
// паралельный роутинг
  return (
    <PostModalNew
      isOpenEdit={openEdit}
      title="Edit Post"
      trigger={<Button onClick={getPostHandler}>trigger for modal</Button>}
      changeEdit={changeOpen}
    >
      <div className={s.root}>
        <div className={s.leftSide}>
          {}
          <img src={res?.images[0].url} alt="sliderImg" />
        </div>
        <div className={s.rightSide}>
          <RightSideHeader
            changeEdit={changeEdit}
            isOpenEdit={openEdit}
            showDeleteModalHandler={showDeleteModalHandler}
          />
          {openEdit ? (
            <EditDescriptionPost
              post={post}
              saveValue={saveTextAreaValue}
              changeEdit={changeEdit}
            />
          ) : (
            <PostContent post={post} likes={res?.likesCount} whosLikes={res?.avatarWhoLikes} updatedAt={res?.updatedAt}  createdAt={res?.createdAt}/>
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
