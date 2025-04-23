import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '@/shared/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const usePostModal = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
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
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.delete('postId')
      setHrefLinkPost(currentUrl.pathname + currentUrl.search)
    }
  }, [])
  return {
    isLoggedIn,
    openEdit,
    changeEdit,
    openModal,
    changeOpen,
    showDeleteModalHandler,
    showDeleteModal,
    setShowDeleteModal,
    hrefLinkPost,
    setHrefLinkPost,
    router,
    onClose,
    handleConfirmClose,
  }
}
