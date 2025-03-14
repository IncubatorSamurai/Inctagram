import { fabric } from 'fabric'

type Props = {
  image: fabric.Image | null
  fabricCanvas: fabric.Canvas | null
}
export const Filters = ({ image, fabricCanvas }: Props) => {
  const applyFilter = (filterType: string) => {
    if (image && fabricCanvas) {
      // Очищаем все предыдущие фильтры, чтобы не накладывать их
      image.filters = []

      let filter: fabric.IBaseFilter | null = null
      switch (filterType) {
        case 'vintage':
          filter = new fabric.Image.filters.Sepia()
          break
        case 'lomo':
          filter = new fabric.Image.filters.Contrast({ contrast: 0.2 })
          break
        case 'soft-focus':
          filter = new fabric.Image.filters.Blur({ blur: 0.1 })
          break
        case 'glow':
          filter = new fabric.Image.filters.Brightness({ brightness: 0.2 })
          break
        case 'color-pop':
          filter = new fabric.Image.filters.Saturation({ saturation: 0.3 })
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

  const saveImage = () => {
    if (fabricCanvas) {
      const dataURL = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
      })
      console.log('Сохраненное изображение (base64):', dataURL)
    }
  }

  return (
    <div>
      <button onClick={() => applyFilter('vintage')}>Винтаж</button>
      <button onClick={() => applyFilter('lomo')}>Ломо</button>
      <button onClick={() => applyFilter('soft-focus')}>Мягкий фокус</button>
      <button onClick={() => applyFilter('glow')}>Сияние</button>
      <button onClick={() => applyFilter('color-pop')}>Цветной эффект</button>
      <button onClick={saveImage}>Сохранить изображение</button>
    </div>
  )
}
