import Image from 'next/image'
import Link from 'next/link'
import styles from './tile.module.css'
import ReactMarkdown from 'react-markdown'

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
      <div className={styles.pubTile}>
        <Link href={href} className={styles.pubImageWrap}>
          <Image src={imageUrl} alt={title} fill className={styles.img} />
        </Link>
        <div className={styles.pubContent}>
          <span className={styles.label}>{label}</span>
          <h2 className={styles.pubTitleBelow}>{title}</h2>
          {tileText && (
            <div className={styles.tileText}>
              <ReactMarkdown>{tileText}</ReactMarkdown>
            </div>
          )}
          <Link href={href} className={styles.learnMore}>
            Learn More
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.eventTile}>
      <span className={styles.label}>{label}</span>
      <h2 className={styles.eventTitle}>{title}</h2>
      <Link href={href} className={styles.eventImageWrap}>
        <Image src={imageUrl} alt={title} fill className={styles.img} />
      </Link>
      {tileText && (
        <div className={styles.tileText}>
          <ReactMarkdown>{tileText}</ReactMarkdown>
        </div>
      )}
      <Link href={href} className={styles.learnMore}>
        Learn More
      </Link>
    </div>
  )
}
