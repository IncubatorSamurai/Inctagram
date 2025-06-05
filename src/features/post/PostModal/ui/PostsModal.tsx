'use client'
import s from './PostsModal.module.scss'
import { ModalCloseOrDeletePost } from './ModalCloseDeletePost/ModalCloseDeletePost'
import { Modal } from '@/shared/ui/modal'
import { CommentsResponse, Post } from '@/shared/api/post/postApi.types'
import { CustomSlider } from '@/shared/ui/customSlider/CustomSlider'
import { AuthorizedContent } from '@/features/post/PostModal/ui/ModalContent/AuthorizedContent'
import { NonAuthorizedContent } from '@/features/post/PostModal/ui/ModalContent/NonAuthorizedContent'
import { usePostModal } from '@/shared/hooks/usePostModal'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type PostModal = {
  post: Post
  commentsData: CommentsResponse | null
  postId: number
}

export const PostsModal = ({ post, commentsData, postId, ...props }: PostModal) => {
  const [isOwner, setIsOwner] = useState<boolean>(false)

  const {
    isLoggedIn,
    openEdit,
    changeEdit,
    openModal,
    changeOpen,
    showDeleteModalHandler,
    showDeleteModal,
    setShowDeleteModal,
    onClose,
  } = usePostModal()
  const { images, userName } = post

  useEffect(() => {
    const userNameUser = localStorage.getItem('userName')
    if (userNameUser === userName) {
      setIsOwner(true)
    }
  }, [isOwner, userName])

  return (
    <Modal
      className={s.modal}
      open={!!postId}
      onOpenChange={isOpen => !isOpen && onClose()}
      defaultOpen
      isTitleHidden={!openEdit}
      title={openEdit ? 'Edit Post' : 'Post'}
      isCloseIcon={!openEdit}
      {...props}
    >
      <div className={s.root}>
        <div className={s.public_modal_img}>
          <CustomSlider {...props}>
            {images.map((image, i) => (
              <Image key={i} src={image.url} alt="picture" width={490} height={562} />
            ))}
          </CustomSlider>
        </div>

        {isLoggedIn ? (
          <AuthorizedContent
            isLoggedIn={isLoggedIn}
            isOwner={isOwner}
            postId={postId}
            openEdit={openEdit}
            changeEdit={changeEdit}
            showDeleteModalHandler={showDeleteModalHandler}
          />
        ) : (
          <NonAuthorizedContent isLoggedIn={isLoggedIn} post={post} commentsData={commentsData} />
        )}
      </div>
      <ModalCloseOrDeletePost
        postId={postId}
        title="Close"
        open={openModal}
        onOpenChange={changeOpen}
        changeEdit={changeEdit}
      />

      <ModalCloseOrDeletePost
        postId={postId}
        title="Delete"
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
      />
    </Modal>
  )
}
