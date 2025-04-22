'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

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
