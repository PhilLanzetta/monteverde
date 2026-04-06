'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import styles from './landingOverlay.module.css'

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false },
)

function removeBlocker() {
  const blocker = document.getElementById('initial-blocker')
  if (!blocker) return
  blocker.style.transition = 'opacity 0.4s ease'
  blocker.style.opacity = '0'
  setTimeout(() => blocker.remove(), 400)
}

function lockScroll() {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${scrollbarWidth}px`
}

function unlockScroll() {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

export default function LandingOverlay() {
  const [show] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('overlayShown') !== 'true'
  })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [gone, setGone] = useState(false)
  const fadingRef = useRef(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!show) return
    lockScroll()
  }, [])

  useEffect(() => {
    if (gone) unlockScroll()
  }, [gone])

  function handleImageLoad() {
    removeBlocker()
    setImageLoaded(true)
  }

  function dismiss() {
    if (fadingRef.current) return
    fadingRef.current = true
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '0'
      overlayRef.current.style.transition = 'opacity 1s ease'
    }
    sessionStorage.setItem('overlayShown', 'true')
    setTimeout(() => {
      setGone(true)
    }, 300)
  }

  if (!show || gone) return null

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={dismiss}>
      <Image
        src='/PACIFIC_MONTEVERDE_BG_IMAGE-01.webp'
        alt=''
        fill
        priority
        className={styles.bgImage}
        onLoad={handleImageLoad}
      />

      <div className={styles.logoWrap}>
        {imageLoaded && (
          <Player
            autoplay
            src='/logoAnimation.json'
            className={styles.player}
            onEvent={(event) => {
              if (event === 'complete') dismiss()
            }}
          />
        )}
      </div>
    </div>
  )
}
