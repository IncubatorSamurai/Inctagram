import { Photo } from '@/shared/types'

export const convertBlobUrlsToFiles = async (files: Photo[]): Promise<File[]> => {
  return Promise.all(
    files.map(async ({ filteredFileUrl, croppedFileUrl, fileUrl, type, id }, i) => {
      try {
        const actualFileUrl = filteredFileUrl || croppedFileUrl || fileUrl

        const response = await fetch(actualFileUrl)
        const blob = await response.blob()

        const extension = type.split('/').pop() || 'jpg'

        return new File([blob], `image-${i}.${extension}`, { type })
      } catch (error) {
        console.error(`Failed to convert file at ${id}:`, error)
        return null
      }
    })
  ).then(results => results.filter(Boolean) as File[])
}
