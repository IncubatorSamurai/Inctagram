import * as fabric from 'fabric'

export const getFilterType = (type: string) => {
  let filter
  switch (type) {
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
  return filter
}
