'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './landingOverlay.module.css'

export default function LandingOverlay() {
  const [show, setShow] = useState(false)
  const [imageReady, setImageReady] = useState(false)
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)
  const fadingRef = useRef(false)

  useEffect(() => {
    if (document.documentElement.dataset.overlayDone === 'true') {
      return
    }
    document.documentElement.style.visibility = ''
    setShow(true)
    document.body.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    if (gone) document.body.style.overflow = ''
  }, [gone])

  useEffect(() => {
    if (!imageReady) return
    const timer = setTimeout(() => dismiss(), 2000)
    return () => clearTimeout(timer)
  }, [imageReady])

  function dismiss() {
    if (fadingRef.current) return
    fadingRef.current = true
    const el = document.querySelector('[class*="overlay"]') as HTMLElement
    if (el) el.style.opacity = '0'
    setFading(true)
    localStorage.setItem('overlayShown', 'true')
    setTimeout(() => {
      setGone(true)
      document.body.style.overflow = ''
    }, 1000)
  }

  if (!show || gone) return null

  return (
    <div
      className={`${styles.overlay} ${fading ? styles.fadeOut : ''}`}
      onClick={dismiss}
    >
      {/* Solid black layer fades out once image is ready */}
      <div
        className={`${styles.blocker} ${imageReady ? styles.blockerFaded : ''}`}
      />

      <Image
        src='/PACIFIC_MONTEVERDE_BG_IMAGE-01.png'
        alt=''
        fill
        priority
        className={styles.bgImage}
        onLoad={() => setImageReady(true)}
      />

      <div className={styles.logoWrap}>
        {/* TODO: swap for <Player> with Lottie JSON when ready */}
        <svg
          className={`${styles.logoSvg} ${imageReady ? styles.logoVisible : ''}`}
          viewBox='0 0 187 22'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6.07055 0.457748L10.3484 15.4355H10.4082L14.8708 0.457748H20.9088V1.158H18.6028V20.0947H20.9088V20.795H13.3226V20.0947H15.6585V1.52311H15.5987L9.71016 20.795H8.91976L3.24849 1.52311H3.18873V20.0947H5.46485V20.795H0V20.0947H2.27612V1.158H0V0.457748H6.07055Z'
            fill='currentColor'
          />
          <path
            d='M30.2878 21.25C25.1597 21.25 21.5771 16.0758 21.5771 10.5937C21.5771 5.11155 25.2195 0 30.2878 0C35.3561 0 38.9984 5.14425 38.9984 10.5937C38.9984 16.0431 35.4484 21.25 30.2878 21.25ZM34.9595 16.5907C35.3534 15.1003 35.5353 13.1195 35.5353 10.6236C35.5353 3.22606 33.9274 0.697525 30.2552 0.697525C28.3131 0.697525 26.8247 1.52039 25.9773 3.55847C25.3091 5.11155 25.0375 7.39486 25.0375 10.6209C25.0375 15.3701 25.6758 17.806 26.9198 19.2065C27.7699 20.1819 28.8917 20.547 30.2878 20.547C32.5639 20.547 34.2017 19.4817 34.9622 16.588L34.9595 16.5907Z'
            fill='currentColor'
          />
          <path
            d='M45.3706 0.457748L53.9889 15.193H54.0486V1.158H51.6829V0.457748H57.2971V1.158H54.9612V21.25H54.1736L42.7903 1.76561H42.7305V20.092H45.0664V20.7922H39.4521V20.092H41.8206V1.158H39.4521V0.457748H45.3706Z'
            fill='currentColor'
          />
          <path
            d='M74.8375 0.457748L75.0493 6.33222H74.2589C73.895 3.40861 72.9851 1.158 69.6768 1.158H68.4328V20.0947H70.9507V20.795H62.968V20.0947H65.4858V1.158H63.3021C61.1183 1.158 60.4501 2.68111 60.0536 4.38405C59.9015 5.02436 59.7793 5.69191 59.6597 6.33222H58.8721L59.2062 0.457748H74.8347H74.8375Z'
            fill='currentColor'
          />
          <path
            d='M91.7101 0.457748V5.41944H91.0419C90.6182 2.64841 89.5236 1.158 86.0959 1.158H81.9375V9.92611H82.6953C85.4576 9.92611 86.0334 9.3185 86.3974 6.66736H87.0655V14.3701H86.3974C86.2154 11.6617 85.5173 10.6863 82.1195 10.6863H81.9375V20.0947H85.8514C90.1619 20.0947 90.9795 19.0893 91.74 15.1031H92.5277L92.1338 20.795H76.3232V20.0947H78.9932V1.158H76.3232V0.457748H91.7101Z'
            fill='currentColor'
          />
          <path
            d='M101.178 0.457748V1.158H98.8098L103.908 16.3482H103.968L108.854 1.158H106.092V0.457748H111.858V1.158H109.704L103.27 21.25H102.512L95.7134 1.158H93.4971V0.457748H101.176H101.178Z'
            fill='currentColor'
          />
          <path
            d='M129.279 0.457748V5.41944H128.611C128.188 2.64841 127.093 1.158 123.665 1.158H119.507V9.92611H120.265C123.027 9.92611 123.603 9.3185 123.967 6.66736H124.635V14.3701H123.967C123.785 11.6617 123.087 10.6863 119.689 10.6863H119.507V20.0947H123.421C127.731 20.0947 128.549 19.0893 129.309 15.1031H130.097L129.703 20.795H113.893V20.0947H116.563V1.158H113.893V0.457748H129.279Z'
            fill='currentColor'
          />
          <path
            d='M141.328 0.457748C145.305 0.457748 147.823 2.22336 147.823 4.93172C147.823 7.8853 145.94 9.5283 141.48 9.89341V9.95335C145.093 10.8362 147.095 12.2067 147.095 16.2556C147.095 16.5608 147.035 16.9858 147.035 17.5635C147.035 18.7814 147.157 20.2718 148.673 20.2718C149.278 20.2718 149.887 20.1492 150.525 19.9067V20.6669C149.463 21.062 148.431 21.2445 147.703 21.2445C146.125 21.2445 144.243 20.4517 143.971 18.1384C143.879 17.3782 143.819 16.7079 143.697 15.5199C143.604 14.727 143.515 13.6017 143.393 12.9614C143.029 10.9206 141.54 10.1604 139.115 10.1604H137.444V20.0838H139.843V20.7841H132.164V20.0838H134.5V1.158H132.164V0.457748H141.328ZM137.441 9.46836H139.688C143.3 9.46836 144.514 8.34305 144.514 5.02436C144.514 2.01083 143.088 1.158 140.418 1.158H137.444V9.46836H137.441Z'
            fill='currentColor'
          />
          <path
            d='M160.629 0.457748C166.001 0.457748 170.008 4.11158 170.008 10.4438C170.008 13.4573 169.068 15.7406 167.609 17.6888C166.153 19.6669 163.967 20.795 160.569 20.795H152.404V20.0947H154.74V1.158H152.404V0.457748H160.629ZM160.477 20.092C163.329 20.092 164.787 19.1165 165.817 17.1684C166.544 15.7979 166.667 12.4492 166.667 10.7435V9.95063C166.667 7.72727 166.515 6.08427 166.061 4.77641C165.151 2.12799 162.905 1.15255 159.871 1.15255H157.687V20.0893H160.479L160.477 20.092Z'
            fill='currentColor'
          />
          <path
            d='M186.18 0.457748V5.41944H185.512C185.088 2.64841 183.993 1.158 180.566 1.158H176.407V9.92611H177.165C179.927 9.92611 180.503 9.3185 180.867 6.66736H181.535V14.3701H180.867C180.685 11.6617 179.987 10.6863 176.589 10.6863H176.407V20.0947H180.321C184.632 20.0947 185.449 19.0893 186.21 15.1031H186.997L186.604 20.795H170.793V20.0947H173.463V1.158H170.793V0.457748H186.18Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </div>
  )
}
