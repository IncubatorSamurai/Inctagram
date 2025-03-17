'use client'
import { useEffect, useRef, useState } from 'react'
import s from './ImageCanvas.module.scss'
import { fabric } from 'fabric'
import { useSelector } from 'react-redux'
import { selectUploadedFiles } from '@/shared/store/postSlice/postSlice'
import { config } from '../lib/fabricImageConfig'

type Props = {
  setImage: (value: fabric.Image | null) => void
  getFabricCanvas: (value: fabric.Canvas | null) => void
}

export const ImageCanvas = ({ setImage, getFabricCanvas }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null)

  useEffect(() => {
    if (fabricCanvas) {
      getFabricCanvas(fabricCanvas)
    }
  }, [fabricCanvas])

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        selection: false,
      })

      const container = containerRef.current
      if (container) {
        //подстраиваем размеры, под родителя
        canvas.setWidth(container.clientWidth)
        canvas.setHeight(container.clientHeight)
        canvas.renderAll()
      }

      setFabricCanvas(canvas)

      return () => {
        canvas.dispose()
      }
    }
  }, [])

  const uploadedFiles = useSelector(selectUploadedFiles)
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const imageUrl = uploadedFiles[0]

      // создаем объект image, т.к. fabricCanvas работает только с объектом image
      const img = new Image()
      img.src = imageUrl

      // обработчик события для img, когда изображение загружается, срабатывает onload
      img.onload = () => {
        if (fabricCanvas) {
          const scaleX = fabricCanvas.width! / img.width
          const scaleY = fabricCanvas.height! / img.height
          const fabricImage = new fabric.Image(img, { ...config, scaleX, scaleY })

          // метод добавляет изображение на холст
          fabricCanvas.add(fabricImage)
          //   обновляет весь холст. Это нужно для того, чтобы все изменения, которые были сделаны на холсте
          // (например, добавление изображения), стали видны на экране.
          fabricCanvas.renderAll()

          setImage(fabricImage)
        }
      }
    }
  }, [uploadedFiles, fabricCanvas])

  return (
    <div ref={containerRef} className={s.container}>
      <canvas ref={canvasRef} />
    </div>
  )
}
