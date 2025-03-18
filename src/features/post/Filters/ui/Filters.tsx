import { selectUploadedFiles } from '@/shared/store/postSlice/postSlice'
import { FilterCard } from '@/shared/ui/filterCard/FilterCard'
import * as fabric from 'fabric'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {
  image: fabric.FabricImage | null
  fabricCanvas: fabric.Canvas | null
}
export const Filters = ({ image, fabricCanvas }: Props) => {
  const uploadedFiles = useSelector(selectUploadedFiles)
  const applyFilter = (filterType: string) => {
    if (image && fabricCanvas) {
      // Очищаем все предыдущие фильтры, чтобы не накладывать их
      image.filters = []

      let filter: fabric.filters.BaseFilter<string> | null = null
      switch (filterType) {
        case 'vintage':
          filter = new fabric.filters.Sepia()
          break
        case 'lomo':
          filter = new fabric.filters.Contrast({ contrast: 0.2 })
          break
        case 'soft-focus':
          filter = new fabric.filters.Blur({ blur: 0.1 })
          break
        case 'glow':
          filter = new fabric.filters.Brightness({ brightness: 0.2 })
          break
        case 'color-pop':
          filter = new fabric.filters.Saturation({ saturation: 0.3 })
          break
        default:
          return
      }

      if (filter) {
        image.filters.push(filter)
        image.applyFilters()
        fabricCanvas.renderAll()
      }
    }
  }
  const [src, setSrc] = useState('')
  useEffect(() => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1,
      })
      setSrc(dataURL)
      console.log('Сохраненное изображение (base64):', dataURL)
    }
  }, [fabricCanvas])
  const saveImage = () => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1,
      })
      console.log('Сохраненное изображение (base64):', dataURL)
    }
  }
  console.log(src)
  return (
    <div>
      <FilterCard src={uploadedFiles[0]} />
      <button onClick={() => applyFilter('vintage')}>Винтаж</button>
      <button onClick={() => applyFilter('lomo')}>Ломо</button>
      <button onClick={() => applyFilter('soft-focus')}>Мягкий фокус</button>
      <button onClick={() => applyFilter('glow')}>Сияние</button>
      <button onClick={() => applyFilter('color-pop')}>Цветной эффект</button>
      <button onClick={saveImage}>Сохранить изображение</button>
    </div>
  )
}
