import { DependencyList, useEffect } from 'react'

export function useDebouncedEffect(callback: () => void, deps: DependencyList, delay: number) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [...deps, delay])
}
