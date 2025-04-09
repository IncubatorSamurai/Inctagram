export function getCanvasFilterString(type: string): string {
  switch (type) {
    case 'original':
      return 'none'

    case 'vintage':
      return 'contrast(1.2) brightness(1.1)'

    case 'lomo':
      return 'saturate(1.6) contrast(1.2)'

    case 'soft-focus':
      return 'blur(3px) brightness(1.2)'

    case 'glow':
      return 'brightness(1.4) blur(2px) saturate(1.3)'

    case 'color-pop':
      return 'contrast(1.4) brightness(1.1) saturate(1.5)'

    case 'сontrast':
      return 'contrast(1.3)'

    case 'vignette':
      return 'brightness(0.9)'

    case 'hue-rotate':
      return 'hue-rotate(90deg) saturate(1.3)'

    case 'blur-strong':
      return 'blur(5px) brightness(1.1)'

    case 'dreamy':
      return 'blur(3px) saturate(1.2)'

    case 'retro':
      return 'sepia(1) contrast(1.1)'

    case 'moody':
      return 'brightness(0.8) contrast(0.9) saturate(1.2)'

    case 'golden-hour':
      return 'brightness(1.2) saturate(1.3) sepia(0.4)'

    default:
      return 'none'
  }
}
