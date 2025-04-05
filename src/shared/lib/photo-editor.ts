export const convertBlobUrlsToFiles = async (blobUrls: string[]) => {
  const filePromises = blobUrls.map(async (url, i) => {
    const response = await fetch(url)
    const blob = await response.blob()

    let extension = 'jpeg'
    if (blob.type === 'png') {
      extension = 'png'
    }

    const file = new File([blob], `file-${i}.${extension}`, { type: blob.type })

    return file
  })

  return Promise.all(filePromises)
}

