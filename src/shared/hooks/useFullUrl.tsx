'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export const useFullUrl = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useMemo(() => {
    const params = searchParams.toString()
    return params ? `${pathname}?${params}` : pathname
  }, [pathname, searchParams])
}

export const useAbsoluteUrl = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useMemo(() => {
    if (typeof window === 'undefined') return ''

    const baseUrl = window.location.origin
    const params = searchParams.toString()
    return params ? `${baseUrl}${pathname}?${params}` : `${baseUrl}${pathname}`
  }, [pathname, searchParams])
}

export function useOrigin(): string {
  const [origin, setOrigin] = useState<string>(() => {
    // на этапе инициализации (может быть SSR) попробуем взять из ENV
    if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL
    }
    // если window уже доступен — сразу вернём origin
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin
    }
    return ''
  })

  useEffect(() => {
    // этот эффект отрабатывает только в браузере
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
  }, [])

  return origin
}
