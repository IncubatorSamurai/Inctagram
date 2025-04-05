import * as fabric from 'fabric'
import { useEffect, useState } from 'react'
import { getFilterType } from '../../lib/filterType'
import { FilterCard } from '@/shared/ui/filterCard/FilterCard'
import { useSelector } from 'react-redux'
import { selectCroppedFiles } from '@/shared/store/postSlice/postSlice'
import { Button } from '@/shared/ui/button'
import s from './Filters.module.scss'
import { useTranslations } from 'next-intl'

type Props = {
  index: number
  setCanvasFilters: (filters: Record<number, fabric.filters.BaseFilter<string>[]>) => void
  fabricCanvases: (fabric.Canvas | null)[]
}

export const Filters = ({ index, fabricCanvases, setCanvasFilters }: Props) => {
  const [filters, setFilters] = useState<Record<number, fabric.filters.BaseFilter<string>[]>>({}) // Храним фильтры по индексу
  const [savedImages, setSavedImages] = useState<string[]>([]) // Массив сохранённых изображений (Blob)
  console.log(filters)
  const t = useTranslations('post.filter')
  const croppedImages = useSelector(selectCroppedFiles)
  const uploadedFiles = useSelector(selectCroppedFiles)

  useEffect(() => {
    setCanvasFilters(filters)
  }, [filters])

  useEffect(() => {
    setSavedImages(croppedImages)
  }, [croppedImages])

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
  const saveImage = () => {
    if (fabricCanvases[index]) {
      const canvas = fabricCanvases[index]

      canvas
        .toBlob({
          format: 'png',
          multiplier: 1,
        })
        .then((blob: Blob | null) => {
          if (blob) {
            const url = URL.createObjectURL(blob)

            setSavedImages(prevImages => {
              const updatedImages = [...prevImages]
              updatedImages[index] = url
              return updatedImages
            })

            console.log('Сохранённое изображение (URL):', url)
          }
        })
    }
  }

  return (
    <div className={s.container}>
      <Button variant="text" className={s.button} onClick={() => applyFilter('original')}>
        <FilterCard src={uploadedFiles[index]} title={t('original')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('vintage')}>
        <FilterCard src={uploadedFiles[index]} title={t('vintage')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('lomo')}>
        <FilterCard src={uploadedFiles[index]} title={t('lomo')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('soft-focus')}>
        <FilterCard src={uploadedFiles[index]} title={t('soft-focus')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('glow')}>
        <FilterCard src={uploadedFiles[index]} title={t('glow')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('invert')}>
        <FilterCard src={uploadedFiles[index]} title={t('invert')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('retro')}>
        <FilterCard src={uploadedFiles[index]} title={t('retro')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('moody')}>
        <FilterCard src={uploadedFiles[index]} title={t('moody')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('golden-hour')}>
        <FilterCard src={uploadedFiles[index]} title={t('golden-hour')} />
      </Button>

      {/* <Button variant="text" className={s.button} onClick={saveImage}>
        Сохранить все изображения
      </Button> */}
    </div>
  )
}
