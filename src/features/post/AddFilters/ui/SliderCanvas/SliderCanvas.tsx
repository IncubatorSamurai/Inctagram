import Slider from 'react-slick'
import s from './SliderCanvas.module.scss'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectCroppedFiles } from '@/shared/store/postSlice/postSlice'
import * as fabric from 'fabric'
type Props = {
  setIndexState: (value: number) => void
  setFabricCanvases: (v: (fabric.Canvas | null)[]) => void
  index: number
}

export const SliderCanvas = ({ setIndexState, setFabricCanvases }: Props) => {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]) // Массив ref для canvas
  const containerRef = useRef<HTMLDivElement | null>(null) // Ref для контейнера
  const uploadedFiles = useSelector(selectCroppedFiles)

  useEffect(() => {
    if (uploadedFiles.length === 0 || !containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight

    const newCanvases = canvasRefs.current.map(canvasEl => {
      if (!canvasEl) return null

      // Устанавливаем размеры canvas через атрибуты
      canvasEl.width = containerWidth
      canvasEl.height = containerHeight

      const fabricCanvas = new fabric.Canvas(canvasEl, {
        selection: false,
        width: containerWidth,
        height: containerHeight,
      })

      // Загружаем изображение

      return fabricCanvas
    })

    setFabricCanvases(newCanvases)

    return () => {
      newCanvases.forEach(canvas => canvas?.dispose())
    }
  }, [uploadedFiles])

  const settings = {
    dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
    beforeChange: (current: number, next: number) => setIndexState(next),
  }

  return (
    <div ref={containerRef} className={s.container}>
      <Slider className={s.slider} {...settings}>
        {uploadedFiles.map((fileUrl, i) => (
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
      </Slider>
    </div>
  )
}
