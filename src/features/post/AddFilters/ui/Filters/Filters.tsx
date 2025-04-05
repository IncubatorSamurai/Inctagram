import { useEffect } from 'react'
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

  useEffect(() => {}, [index, canvasContexts, files])

  const applyFilter = async (filterType: string) => {
    const url = await applyFilterToCanvas({
      canvasContexts,
      index,
      files,
      filterType,
    })

    if (typeof url === 'string') {
      dispatch(addFilteredFiles({ croppedFileUrl: url, index: index }))
    }
  }

  return (
    <div className={s.container}>
      <Button variant="text" className={s.button} onClick={() => applyFilter('original')}>
        <FilterCard src={files[index].fileUrl} title={t('original')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('vintage')}>
        <FilterCard src={files[index].fileUrl} title={t('vintage')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('lomo')}>
        <FilterCard src={files[index].fileUrl} title={t('lomo')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('soft-focus')}>
        <FilterCard src={files[index].fileUrl} title={t('soft-focus')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('glow')}>
        <FilterCard src={files[index].fileUrl} title={t('glow')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('dreamy')}>
        <FilterCard src={files[index].fileUrl} title={t('dreamy')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('retro')}>
        <FilterCard src={files[index].fileUrl} title={t('retro')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('moody')}>
        <FilterCard src={files[index].fileUrl} title={t('moody')} />
      </Button>
      <Button variant="text" className={s.button} onClick={() => applyFilter('golden-hour')}>
        <FilterCard src={files[index].fileUrl} title={t('golden-hour')} />
      </Button>
    </div>
  )
}
