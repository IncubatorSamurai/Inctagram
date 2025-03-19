import * as fabric from 'fabric'

import { useEffect, useState } from 'react'
import { getFilterType } from '../../lib/filterType'

type Props = {
  index: number
  setCanvasFilters: (filters: Record<number, fabric.filters.BaseFilter<string>[]>) => void
  fabricCanvases: (fabric.Canvas | null)[]
}
export const Filters = ({ index, fabricCanvases, setCanvasFilters }: Props) => {
  const [filters, setFilters] = useState<Record<number, fabric.filters.BaseFilter<string>[]>>({}) // Храним фильтры по индексу

  useEffect(() => {
    setCanvasFilters(filters)
  }, [filters])

  //   const saveImage = () => {
  //     if (fabricCanvases[index]) {
  //       const dataURL = fabricCanvases[index]?.toDataURL({
  //         format: 'png',
  //         quality: 1,
  //         multiplier: 1,
  //       })
  //       console.log('Сохранённое изображение (base64):', dataURL)
  //     }
  //   }

  const applyFilter = (filterType: string) => {
    if (fabricCanvases[index]) {
      const canvas = fabricCanvases[index]
      const image = canvas.getObjects()[0] as fabric.Image

      const filter = getFilterType(filterType)

      if (filter) {
        image.filters = [filter]
        image.applyFilters()
        canvas.renderAll()

        setFilters(prevFilters => ({
          ...prevFilters,
          [index]: [filter],
        }))
      }
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
      <button onClick={() => applyFilter('vintage')}>Винтаж</button>
      <button onClick={() => applyFilter('lomo')}>Ломо</button>
      <button onClick={() => applyFilter('soft-focus')}>Мягкий фокус</button>
      <button onClick={() => applyFilter('glow')}>Сияние</button>
      <button onClick={() => applyFilter('color-pop')}>Цветной эффект</button>
      {/* <button onClick={saveImage}>Сохранить изображение</button> */}
    </div>
  )
}
