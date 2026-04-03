'use client'

import { useState } from 'react'
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

  return (
    <div className={styles.slideshow}>
      {imageUrl && (
        <div className={styles.slideshowImage}>
          <Image
            src={imageUrl}
            alt={caption ?? ''}
            fill
            className={styles.img}
            priority
          />
        </div>
      )}
      {caption && <p className={styles.caption}>{caption}</p>}
      {images.length > 1 && (
        <div className={styles.slideshowControls}>
          <button
            className={styles.slideshowBtn}
            onClick={() =>
              setCurrent((c) => (c - 1 + images.length) % images.length)
            }
            aria-label='Previous image'
          >
            ←
          </button>
          <span className={styles.slideshowCount}>
            {current + 1} / {images.length}
          </span>
          <button
            className={styles.slideshowBtn}
            onClick={() => setCurrent((c) => (c + 1) % images.length)}
            aria-label='Next image'
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
