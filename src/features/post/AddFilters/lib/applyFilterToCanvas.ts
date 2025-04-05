import { Photo } from '@/shared/store'
import { getCanvasFilterString } from './filterType'

type Props = {
  canvasContexts: (CanvasRenderingContext2D | null)[]
  index: number
  files: Photo[]
  filterType: string
}

export const applyFilterToCanvas = ({ canvasContexts, index, files, filterType }: Props) => {
  return new Promise(resolve => {
    const ctx = canvasContexts[index]
    if (!ctx) return

    const file = files[index]
    const img = new Image()
    img.src = file.editedFileUrl || file.fileUrl

    img.onload = () => {
      const canvas = ctx.canvas
      //   const canvas = ctx.canvas
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
      }, 'image/jpeg')
    }

    img.onerror = () => {
      console.error(`Ошибка загрузки изображения: ${file.fileUrl}`)
    }
  })
}
