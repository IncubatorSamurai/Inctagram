'use client'
import s from './PostModal.module.scss'
import { ModalCloseOrDeletePost } from './ModalCloseDeletePost/ModalCloseDeletePost'

import { RightSideHeader } from './RightSideHeader/RightSideHeader'

import { PostContent } from './PostContent/PostContent'
import { EditDescriptionPost } from './EditDescriptionPost/EditDiscriptionPost'

import { Modal } from '@/shared/ui/modal'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGetPostByIdQuery } from '@/shared/api/post/postApi'

type PublicModal = {
  postId: number
}

export const PublicModalAlex = ({ postId, ...props }: PublicModal) => {
  const { data } = useGetPostByIdQuery({ id: postId })

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

  const [hrefLinkPost, setHrefLinkPost] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.delete('postId')
      setHrefLinkPost(currentUrl.pathname + currentUrl.search)
    }
  }, [])

  const onClose = () => {
    if (openEdit) {
      changeOpen()
    }

    if (!openEdit) {
      handleConfirmClose()
    }
  }

  const handleConfirmClose = () => {
    if (window.history.length > 2) {
      router.back()
    } else if (hrefLinkPost) {
      router.replace(hrefLinkPost, { scroll: false })
    }
  }


  return (
    <Modal
      className={s.modal}
      open={!!postId}
      onOpenChange={isOpen => !isOpen && onClose()}
      defaultOpen
      isTitleHidden={!openEdit}
      title={openEdit ? "Edit Post" : 'Post'}
      isCloseIcon={!openEdit}
      {...props}
    >
      <div className={s.root}>
        <div className={s.leftSide}>
          {/* СЛАЙДЕР*/}
          <img src={data?.images[0].url} alt="testImg" />
        </div>
        {/*-------*/}
        <div className={s.rightSide}>
          <RightSideHeader
            postUserName={data?.userName}
            changeEdit={changeEdit}
            isOpenEdit={openEdit}
            showDeleteModalHandler={showDeleteModalHandler}
          />
          {openEdit ? (
            <EditDescriptionPost
              postId={postId}
              description={data?.description}
              changeEdit={changeEdit}
            />
          ) : (
            <PostContent
              description={data?.description}
              ownreName={data?.userName}
              likes={data?.likesCount}
              whosLikes={data?.avatarWhoLikes}
              updatedAt={data?.updatedAt}
              createdAt={data?.createdAt}
            />
          )}
        </div>
      </div>
      {openModal && (
        <ModalCloseOrDeletePost
          postId={postId}
          title="Close"
          open={openModal}
          onOpenChange={changeOpen}
          changeEdit={changeEdit}
        />
      )}
      {showDeleteModal && (
        <ModalCloseOrDeletePost
          postId={postId}
          title="Delete"
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
        />
      )}
    </Modal>
  )
}
