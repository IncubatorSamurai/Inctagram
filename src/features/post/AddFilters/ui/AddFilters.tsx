import { useEffect, useState } from 'react'
import * as fabric from 'fabric'
import { useSelector } from 'react-redux'
import { selectCroppedFiles, selectFiles } from '@/shared/store/postSlice/postSlice'
import { config } from '../lib/fabricImageConfig'
import { Filters } from './Filters/Filters'
import { SliderCanvas } from './SliderCanvas/SliderCanvas'
import s from './AddFilters.module.scss'

export const AddFilters = () => {
  const [fabricCanvases, setFabricCanvases] = useState<(fabric.Canvas | null)[]>([]) // Массив для хранения Fabric Canvas
  const [filters, setFilters] = useState<Record<number, fabric.filters.BaseFilter<string>[]>>({}) // Храним фильтры по индексу

  // const uploadedFiles = useSelector(selectCroppedFiles)
  const files = useSelector(selectFiles)
  const [index, setIndexState] = useState(0)


  useEffect(() => {
    if (!files.length || !fabricCanvases[index]) return

    const imageUrl = files[index].fileUrl
    const canvas = fabricCanvases[index]

    if (!canvas) return

    const img = new Image()
    img.src = imageUrl

    img.onload = () => {
      if (!canvas || canvas.getObjects().length > 0) return

      const scaleX = canvas.width! / img.width
      const scaleY = canvas.height! / img.height
      const fabricImage = new fabric.Image(img, { ...config, scaleX, scaleY })

      if (canvas && canvas.getContext()) {
        canvas.clear() // Очищаем canvas перед добавлением нового изображения
        canvas.add(fabricImage)
        canvas.renderAll() // Перерисовываем canvas
      }
    }

    img.onerror = () => {
      console.error(`Ошибка загрузки изображения: ${imageUrl}`)
    }
  }, [index, uploadedFiles.length, fabricCanvases])

  // Применение фильтров при изменении индекса
  useEffect(() => {
    if (fabricCanvases[index]) {
      const canvas = fabricCanvases[index]
      const image = canvas.getObjects()[0] as fabric.Image

      if (filters[index]) {
        image.filters = filters[index]
        image.applyFilters()
        canvas.renderAll()
      }
    }
  }, [index, filters])

  return (
    <div className={s.row}>
      <div className={s.slider}>
        <SliderCanvas
          setIndexState={e => setIndexState(e)}
          index={index}
          setFabricCanvases={e => setFabricCanvases(e)}
        />
      </div>
      {/* {isImageLoaded && uploadedFiles.length > 0 && <FilterCard src={uploadedFiles[index]} />} */}
      <div>
        {' '}
        <Filters
          index={index}
          setCanvasFilters={e => setFilters(e)}
          fabricCanvases={fabricCanvases}
        />
      </div>
    </div>
  )
}
