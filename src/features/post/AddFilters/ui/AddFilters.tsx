import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectFiles } from '@/shared/store/postSlice/postSlice'
import { SliderCanvas } from './SliderCanvas/SliderCanvas'
import s from './AddFilters.module.scss'
import { Filters } from './Filters/Filters'

export const AddFilters = () => {
  const [canvasContexts, setCanvasContexts] = useState<(CanvasRenderingContext2D | null)[]>([]) // теперь тут обычные контексты
  const files = useSelector(selectFiles)
  const [index, setIndexState] = useState(0)

  useEffect(() => {
    const ctx = canvasContexts[index]
    if (!ctx) return

    const file = files[index]
    const img = new Image()
    img.src = file.filteredFileUrl || file.editedFileUrl || file.fileUrl

    img.onload = () => {
      const canvas = ctx.canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // отрисовка изображения
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

    img.onerror = () => {
      console.error(`Ошибка загрузки изображения: ${file.fileUrl}`)
    }
  }, [canvasContexts, index, files])

  return (
    <div className={s.row}>
      <div className={s.slider}>
        <SliderCanvas
          setIndexState={e => setIndexState(e)}
          index={index}
          setFabricCanvases={setCanvasContexts}
        />
      </div>
      <Filters index={index} canvasContexts={canvasContexts} />
    </div>
  )
}
