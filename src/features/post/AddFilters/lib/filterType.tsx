import * as fabric from 'fabric'

export const getFilterType = (type: string) => {
  const filters: fabric.filters.BaseFilter<string>[] = []

  switch (type) {
    case 'original':
      filters.push(new fabric.filters.Gamma({ gamma: [1, 1, 1] }))
      break

    case 'vintage':
      filters.push(
        new fabric.filters.Gamma({ gamma: [1.1, 1.3, 1.6] }),
        new fabric.filters.Contrast({ contrast: 0.2 })
      )
      break

    case 'lomo':
      filters.push(
        new fabric.filters.Gamma({ gamma: [1.2, 1.5, 1.8] }),
        new fabric.filters.Saturation({ saturation: 0.6 })
      )
      break

    case 'soft-focus':
      filters.push(
        new fabric.filters.Gamma({ gamma: [1.4, 1.2, 1.5] }),
        new fabric.filters.Blur({ blur: 0.4 }),
        new fabric.filters.Brightness({ brightness: 0.2 })
      )
      break

    case 'glow':
      filters.push(
        new fabric.filters.Gamma({ gamma: [1.3, 1.6, 1.2] }),
        new fabric.filters.Brightness({ brightness: 0.4 }),
        new fabric.filters.Blur({ blur: 0.2 }),
        new fabric.filters.Saturation({ saturation: 0.3 })
      )
      break

    case 'color-pop':
      filters.push(
        new fabric.filters.Gamma({ gamma: [1.7, 1.3, 1.4] }),
        new fabric.filters.Saturation({ saturation: 0.8 }),
        new fabric.filters.Contrast({ contrast: 0.4 }),
        new fabric.filters.Brightness({ brightness: 0.1 })
      )
      break

    case 'invert':
      filters.push(
        new fabric.filters.Gamma({ gamma: [1.5, 1.8, 1.2] }),
        new fabric.filters.Contrast({ contrast: 0.3 })
      )
      break

    case 'vignette':
      filters.push(
        new fabric.filters.BaseFilter({
          blur: 0.6,
          opacity: 0.8,
          color: 'black',
        })
      )
      break

    case 'hue-rotate':
      filters.push(
        new fabric.filters.HueRotation({ rotation: 90 }),
        new fabric.filters.Saturation({ saturation: 0.5 })
      )
      break

    case 'blur-strong':
      filters.push(
        new fabric.filters.Blur({ blur: 0.8 }),
        new fabric.filters.Brightness({ brightness: 0.1 })
      )
      break

    case 'dreamy':
      filters.push(
        new fabric.filters.Blur({ blur: 0.5 }),
        new fabric.filters.Brightness({ brightness: 0.3 }),
        new fabric.filters.Saturation({ saturation: 0.4 })
      )
      break

    case 'retro':
      filters.push(new fabric.filters.Sepia(), new fabric.filters.Noise({ noise: 0.3 }))
      break

    case 'moody':
      filters.push(
        new fabric.filters.Brightness({ brightness: -0.2 }),
        new fabric.filters.Contrast({ contrast: -0.1 }),
        new fabric.filters.Saturation({ saturation: 0.3 })
      )
      break

    case 'golden-hour':
      filters.push(
        new fabric.filters.Gamma({ gamma: [1.6, 1.4, 1.3] }),
        new fabric.filters.Brightness({ brightness: 0.2 }),
        new fabric.filters.Saturation({ saturation: 0.4 })
      )
      break

    default:
      return null
  }

  return filters
}
