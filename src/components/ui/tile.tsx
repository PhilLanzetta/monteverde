import Image from 'next/image'
import Link from 'next/link'
import styles from './tile.module.css'

interface TileProps {
  label: string
  title: string
  imageUrl: string
  tileText?: string
  href: string
  variant: 'event' | 'publication'
}

export default function Tile({
  label,
  title,
  imageUrl,
  tileText,
  href,
  variant,
}: TileProps) {
  if (variant === 'publication') {
    return (
      <article className={styles.pubTile}>
        <div className={styles.pubImageWrap}>
          <Image src={imageUrl} alt={title} fill className={styles.img} />
        </div>
        <div className={styles.pubContent}>
          <span className={styles.label}>{label}</span>
          <h2 className={styles.pubTitleBelow}>{title}</h2>
          {tileText && <p className={styles.tileText}>{tileText}</p>}
          <Link href={href} className={styles.learnMore}>
            Learn More
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className={styles.eventTile}>
      <span className={styles.label}>{label}</span>
      <h2 className={styles.eventTitle}>{title}</h2>
      <div className={styles.eventImageWrap}>
        <Image src={imageUrl} alt={title} fill className={styles.img} />
      </div>
      {tileText && <p className={styles.tileText}>{tileText}</p>}
      <Link href={href} className={styles.learnMore}>
        Learn More
      </Link>
    </article>
  )
}
