import s from './SliderCanvas.module.scss'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectFiles } from '@/shared/store/postSlice/postSlice'
import { CustomSlider } from '@/shared/ui/customSlider/CustomSlider'

type Props = {
  setIndexState: (value: number) => void
  setFabricCanvases: (v: (CanvasRenderingContext2D | null)[]) => void
  index: number
}

export const SliderCanvas = ({ setIndexState, setFabricCanvases }: Props) => {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const files = useSelector(selectFiles)

  useEffect(() => {
    if (files.length === 0 || !containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight

    const contexts: (CanvasRenderingContext2D | null)[] = []

    files.forEach((_, index) => {
      const canvasEl = canvasRefs.current[index]
      if (!canvasEl) {
        contexts.push(null)
        return
      }

      // Установка размеров
      if (canvasEl.width !== containerWidth) canvasEl.width = containerWidth
      if (canvasEl.height !== containerHeight) canvasEl.height = containerHeight

      const ctx = canvasEl.getContext('2d')
      if (!ctx) {
        contexts.push(null)
        return
      }

      const img = new Image()
      img.onload = () => {
        // Отрисовка изображения с подгонкой под размер
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
        ctx.drawImage(img, 0, 0, canvasEl.width, canvasEl.height)
      }
      contexts.push(ctx)
    })

    setFabricCanvases(contexts)
  }, [files])

  return (
    <div ref={containerRef} className={s.container}>
      <CustomSlider
        className={s.slider}
        onSlideChange={({ activeIndex }) => setIndexState(activeIndex)}
      >
        {files.map((_, i) => (
          <div key={i}>
            <canvas
              className={s.canvas}
              ref={el => {
                canvasRefs.current[i] = el
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ))}
      </CustomSlider>
    </div>
  )
}
