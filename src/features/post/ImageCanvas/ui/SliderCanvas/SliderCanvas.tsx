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
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]) // Массив ref для контейнеров
  const uploadedFiles = useSelector(selectCroppedFiles)

  useEffect(() => {
    if (uploadedFiles.length === 0) return

    const newCanvases = canvasRefs.current.map((canvasEl, i) => {
      if (!canvasEl) return null

      const fabricCanvas = new fabric.Canvas(canvasEl, { selection: false })
      const container = containerRefs.current[i]
      console.log(fabricCanvas)
      if (container) {
        fabricCanvas.setWidth(container.clientWidth)
        fabricCanvas.setHeight(container.clientHeight)
        fabricCanvas.renderAll()
      }

      return fabricCanvas
    })

    setFabricCanvases(newCanvases)
    // getFabricCanvas(newCanvases[index] || null) // Передаем текущий canvas в родительский компонент

    return () => {
      newCanvases.forEach(canvas => canvas?.dispose())
    }
  }, [uploadedFiles]) // Зависимость только от длины uploadedFiles

  const settings = {
    dots: true,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
    beforeChange: (current: number, next: number) => setIndexState(next),
  }

  return (
    <Slider className={s.slider} {...settings}>
      {uploadedFiles.map((fileUrl, i) => (
        <div key={i}>
          <div style={{ width: '100%', height: '400px' }}>
            <canvas
              ref={el => {
                canvasRefs.current[i] = el
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      ))}
    </Slider>
  )
}
