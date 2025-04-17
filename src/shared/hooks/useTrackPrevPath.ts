'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const useTrackPrevPath = () => {
  const pathname = usePathname()

  useEffect(() => {

    const prev = localStorage.getItem('prevPath')
    if (prev !== pathname) {
      localStorage.setItem('prevPath', pathname)
    }
  }, [pathname])
}
