'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './landingOverlay.module.css'

import dynamic from 'next/dynamic'

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false },
)

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
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('overlayShown') !== 'true'
  })
  const [gone, setGone] = useState(false)
  const fadingRef = useRef(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!show) return
    document.documentElement.style.visibility = 'hidden'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.style.visibility = ''
        lockScroll()
      })
    })
  }, [])

  useEffect(() => {
    if (gone) unlockScroll()
  }, [gone])

  function dismiss() {
    if (fadingRef.current) return
    fadingRef.current = true
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '0'
      overlayRef.current.style.transition = 'opacity 1s ease'
    }
    localStorage.setItem('overlayShown', 'true')
    setTimeout(() => {
      setGone(true)
    }, 1000)
  }

  if (!show || gone) return null

  return (
    <div ref={overlayRef} className={styles.overlay} onClick={dismiss}>
      <Image
        src='/PACIFIC_MONTEVERDE_BG_IMAGE-01.png'
        alt=''
        fill
        priority
        className={styles.bgImage}
      />

      <div className={styles.logoWrap}>
        <Player
          autoplay
          src='/logoAnimation.json'
          className={styles.player}
          onEvent={(event) => {
            if (event === 'complete') dismiss()
          }}
        />
      </div>
    </div>
  )
}
