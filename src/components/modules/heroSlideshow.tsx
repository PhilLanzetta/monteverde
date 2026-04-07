'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import type { Asset } from 'contentful'
import type { ImageWrapperEntry } from '@/types/publication'
import styles from './heroSlideshow.module.css'

export default function HeroSlideshow({
  images,
}: {
  images: ImageWrapperEntry[]
}) {
  const [current, setCurrent] = useState(0)

  if (!images.length) return null

  const item = images[current]
  const asset = item.fields.image as unknown as Asset
  const imageUrl = asset?.fields?.file?.url
    ? `https:${asset.fields.file.url}`
    : null
  const caption = item.fields.caption as string | undefined

  const touchStartX = useRef(0)

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) < 50) return // ignore small movements
    if (diff > 0) {
      setCurrent((c) => (c + 1) % images.length)
    } else {
      setCurrent((c) => (c - 1 + images.length) % images.length)
    }
  }

  return (
    <div
      className={styles.slideshow}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {imageUrl && (
        <div className={styles.imageWrap}>
          <Image
            src={imageUrl}
            alt={caption ?? ''}
            fill
            className={styles.img}
            priority
          />
        </div>
      )}

      {images.length > 1 && (
        <div className={styles.controls}>
          <button
            className={styles.caret}
            onClick={() =>
              setCurrent((c) => (c - 1 + images.length) % images.length)
            }
            aria-label='Previous image'
          >
            &#8249;
          </button>

          <div className={styles.dots}>
            {images.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>

          <button
            className={styles.caret}
            onClick={() => setCurrent((c) => (c + 1) % images.length)}
            aria-label='Next image'
          >
            &#8250;
          </button>
        </div>
      )}

      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  )
}
