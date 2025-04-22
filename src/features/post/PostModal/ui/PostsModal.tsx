'use client'
import s from './PostsModal.module.scss'
import { ModalCloseOrDeletePost } from './ModalCloseDeletePost/ModalCloseDeletePost'
import Slider from 'react-slick'
import { Modal } from '@/shared/ui/modal'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CommentsResponse, Post } from '@/shared/api/post/postApi.types'
import { useSliderSettings } from '@/shared/ui/slider/CustomSlider'
import Image from 'next/image'
import { AuthorizedContent } from '@/features/post/PostModal/ui/ModalContent/AuthorizedContent'
import { NonAuthorizedContent } from '@/features/post/PostModal/ui/ModalContent/NonAuthorizedContent'
import { usePostModal } from '@/shared/hooks/usePostModal'

const WIDTH_MODAL_IMAGE = 490
const HEIGHT_MODAL_IMAGE = 564

type PublicModal = {
  post: Post
  commentsData: CommentsResponse | null
  postId: number
}

export const PostsModal = ({ post, commentsData, postId, ...props }: PublicModal) => {
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

  const { images } = post

  const { settings } = useSliderSettings({
    sliderClass: s.slider_modal,
    dotsClass: s.slider_modal_dots,
    totalSlides: images.length,
  })

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
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <Image
                  src={image.url}
                  alt=""
                  className={s.slider_img}
                  priority={true}
                  width={WIDTH_MODAL_IMAGE}
                  height={HEIGHT_MODAL_IMAGE}
                />
              </div>
            ))}
          </Slider>
        </div>

        {isLoggedIn ? (
          <AuthorizedContent
            postId={postId}
            openEdit={openEdit}
            changeEdit={changeEdit}
            showDeleteModalHandler={showDeleteModalHandler}
          />
        ) : (
          <NonAuthorizedContent post={post} commentsData={commentsData} />
        )}
      </div>
      {isLoggedIn ? (
        <>
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
        </>
      ) : null}
    </Modal>
  )
}
