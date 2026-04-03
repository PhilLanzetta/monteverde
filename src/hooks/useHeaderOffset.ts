'use client'

import { useEffect, useRef } from 'react'

export function useHeaderOffset(selector: string = 'header') {
  const mainRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const header = document.querySelector(selector)
    if (!header) return

    const observer = new ResizeObserver(() => {
      const height = header.getBoundingClientRect().height
      if (mainRef.current) {
        mainRef.current.style.paddingTop = `${height}px`
      }
    })

    observer.observe(header)
    return () => observer.disconnect()
  }, [selector])

  return mainRef
}
