import { Photo } from '@/shared/types'
import { getCanvasFilterString } from './filterType'

type Props = {
  canvasContexts: (CanvasRenderingContext2D | null)[]
  index: number
  file: Photo
  filterType: string
}

export const applyFilterToCanvas = ({ canvasContexts, index, file, filterType }: Props) => {
  return new Promise(resolve => {
    const ctx = canvasContexts[index]
    if (!ctx) return

    const img = new Image()
    img.src = file.croppedFileUrl || file.fileUrl

    img.onload = () => {
      const canvas = ctx.canvas

      if (!canvas) return resolve(null)

      // Очистка и установка фильтра
      ctx.filter = 'none'
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.filter = getCanvasFilterString(filterType)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      canvas.toBlob(file => {
        if (file) {
          resolve(URL.createObjectURL(file))
        } else {
          resolve(null)
        }
      }, file.type)
    }

    img.onerror = () => {
      console.error(`Ошибка загрузки изображения: ${file.fileUrl}`)
      resolve(null)
    }
  })
}
