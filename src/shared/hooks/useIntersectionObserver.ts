import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options?: globalThis.IntersectionObserverInit) {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!targetRef.current) return

    const observer = new IntersectionObserver(entries => {
      const [entry] = entries
      setIsInView(entry.isIntersecting)
    }, options)

    const target = targetRef.current

    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [options])

  return { isInView, targetRef }
}
