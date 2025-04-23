import { Area } from 'react-easy-crop'

export const getCroppedFile = (
  fileUrl: string,
  croppedAreaPixels: Area,
  fileType: string
): Promise<string | null> => {
  return new Promise(async resolve => {
    const { width, height, x, y } = croppedAreaPixels

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    const imageObj = new window.Image() as HTMLImageElement
    imageObj.src = fileUrl

    imageObj.onload = () => {
      context?.drawImage(imageObj, x, y, width, height, 0, 0, width, height)

      canvas.toBlob(file => {
        if (file) {
          resolve(URL.createObjectURL(file))
        } else {
          resolve(null)
        }
      }, fileType)
    }
  })
}
