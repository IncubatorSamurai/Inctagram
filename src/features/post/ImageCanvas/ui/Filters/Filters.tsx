import * as fabric from 'fabric'
import { useEffect, useState } from 'react'
import { getFilterType } from '../../lib/filterType'
import { FilterCard } from '@/shared/ui/filterCard/FilterCard'
import { useSelector } from 'react-redux'
import { selectCroppedFiles } from '@/shared/store/postSlice/postSlice'
import { Button } from '@/shared/ui/button'
import s from './Filters.module.scss'

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

  const uploadedFiles = useSelector(selectCroppedFiles)

  const applyFilter = (filterType: string) => {
    if (fabricCanvases[index]) {
      const canvas = fabricCanvases[index]
      const image = canvas.getObjects()[0] as fabric.Image

      const newFilters = getFilterType(filterType)

      if (newFilters) {
        image.filters = newFilters // Применяем массив фильтров
        image.applyFilters()
        canvas.renderAll()

        setFilters(prevFilters => ({
          ...prevFilters,
          [index]: newFilters, // Обновляем состояние с новыми фильтрами
        }))
      }
    }
  }

  return (
    <div className={s.container}>
      {' '}
      <Button variant="text" className={s.button} onClick={() => applyFilter('original')}>
        <FilterCard src={uploadedFiles[index]} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('vintage')}>
        <FilterCard src={uploadedFiles[index]} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('lomo')}>
        <FilterCard src={uploadedFiles[index]} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('soft-focus')}>
        <FilterCard src={uploadedFiles[index]} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('glow')}>
        <FilterCard src={uploadedFiles[index]} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('invert')}>
        <FilterCard src={uploadedFiles[index]} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('retro')}>
        <FilterCard src={uploadedFiles[index]} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('moody')}>
        <FilterCard src={uploadedFiles[index]} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('golden-hour')}>
        <FilterCard src={uploadedFiles[index]} />
      </Button>
    </div>
  )
}
