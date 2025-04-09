import { FilterCard } from '@/shared/ui/filterCard/FilterCard'
import { useSelector } from 'react-redux'
import { selectFiles } from '@/shared/store/postSlice/postSlice'
import { addFilteredFiles } from '@/shared/store/postSlice/postSlice'
import { Button } from '@/shared/ui/button'
import s from './Filters.module.scss'
import { useTranslations } from 'next-intl'
import { useAppDispatch } from '@/shared/hooks'
import { applyFilterToCanvas } from '../../lib/applyFilterToCanvas'

type Props = {
  index: number
  canvasContexts: (CanvasRenderingContext2D | null)[]
}

export const Filters = ({ index, canvasContexts }: Props) => {
  const t = useTranslations('post.filter')
  const files = useSelector(selectFiles)
  const dispatch = useAppDispatch()

  const file = files[index]

  const applyFilter = async (filterType: string) => {
    const url = await applyFilterToCanvas({
      canvasContexts,
      index,
      file,
      filterType,
    })

    if (typeof url === 'string' && file.id) {
      dispatch(addFilteredFiles({ fileUrl: url, id: file.id }))
    }
  }

  const filters = [
    'original',
    'vintage',
    'lomo',
    'soft-focus',
    'glow',
    'dreamy',
    'retro',
    'moody',
    'golden-hour',
  ]
  return (
    <div className={s.container}>
      {filters.map((filter, i) => (
        <Button key={i} variant="text" className={s.button} onClick={() => applyFilter(filter)}>
          <FilterCard src={file.croppedFileUrl ?? file.fileUrl} title={t(filter)} />
        </Button>
      ))}
    </div>
  )
}
