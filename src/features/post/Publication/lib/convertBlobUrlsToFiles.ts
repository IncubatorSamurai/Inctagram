import { Photo } from '@/shared/types'

export const convertBlobUrlsToFiles = async (files: Photo[]): Promise<File[]> => {
  const filePromises = files.map(async ({ filteredFileUrl, croppedFileUrl, fileUrl, type }, i) => {
    const actualFileUrl = filteredFileUrl ?? croppedFileUrl ?? fileUrl

    const response = await fetch(actualFileUrl)
    const blob = await response.blob()

    const extension = type.slice(type.indexOf('/') + 1)

    return new File([blob], `image-${i}.${extension}`, { type })
  })

  return (await Promise.all(filePromises)).filter(Boolean) as File[]
}
