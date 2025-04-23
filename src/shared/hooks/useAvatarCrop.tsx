import { useCallback, useState } from 'react'

type Area = {
  width: number
  height: number
  x: number
  y: number
}

export const useAvatarCrop = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const getCroppedImage = async (imageSrc: string): Promise<Blob | null> => {
    if (!croppedAreaPixels) return null

    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return null

    canvas.width = 192
    canvas.height = 192

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      192,
      192
    )

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        resolve(blob)
      }, 'image/png')
    })
  }

  const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.src = url
      image.onload = () => resolve(image)
      image.onerror = e => reject(e)
    })
  }

  return {
    crop,
    setCrop,
    zoom,
    setZoom,
    onCropComplete,
    getCroppedImage,
  }
}
