import { useRouter } from '@/i18n/routing'
import {
  useUploadImageForPostMutation,
  useCreatePostMutation,
  useDeleteImageForPostMutation,
} from '@/shared/api/post/postApi'
import { PATH } from '@/shared/config/routes'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { removeFiles, selectFiles } from '@/shared/store'
import { useState } from 'react'
import { convertBlobUrlsToFiles } from './convertBlobUrlsToFiles'

export const MAX_DESCRIPTION_LENGTH = 500

export const usePublication = (closeAllModals: () => void) => {
  const [description, setDescription] = useState('')
  const files = useAppSelector(selectFiles)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [uploadImageForPost, { isLoading: isLoadingUploadImage }] = useUploadImageForPostMutation()
  const [createPost, { isLoading: isLoadingCreatePost }] = useCreatePostMutation()
  const [deleteImageForPost] = useDeleteImageForPostMutation()

  const handleCreatePost = async () => {
    let uploadIdImages = [] as { uploadId: string }[]

    try {
      const filesForUpload = await convertBlobUrlsToFiles(files)

      const formData = new FormData()
      filesForUpload.forEach(file => formData.append('file', file))

      const uploadImageResponse = await uploadImageForPost(formData).unwrap()
      uploadIdImages = uploadImageResponse.images.map(res => ({ uploadId: res.uploadId }))

      await createPost({ description, childrenMetadata: uploadIdImages }).unwrap()
      router.push(PATH.HOME)
      closeAllModals()
      dispatch(removeFiles())
    } catch (e) {
      if (uploadIdImages.length) {
        Promise.all(uploadIdImages.map(uploadId => deleteImageForPost(uploadId))).catch(e =>
          console.error('Failed to remove uploaded images', e)
        )
      }

      console.error('create post error', e)
    }
  }

  const isLoading = isLoadingUploadImage || isLoadingCreatePost

  return {
    description,
    files,
    isLoading,
    setDescription,
    handleCreatePost,
  }
}
