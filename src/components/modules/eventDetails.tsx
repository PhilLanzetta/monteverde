import Image from 'next/image'
import type { EventDetailsEntry } from '@/types/event'
import type { Asset } from 'contentful'
import styles from './modules.module.css'

export default function EventDetails({ entry }: { entry: EventDetailsEntry }) {
  const { image, address, datetime, ticketPrice, ticketUrl } = entry.fields

  const asset = image as unknown as Asset
  const imageUrl = asset?.fields?.file?.url
    ? `https:${asset.fields.file.url}`
    : null

  return (
    <section className={styles.eventDetails}>
      <h2 className={styles.heading}>
        Details
      </h2>
      {imageUrl && (
        <div className={styles.eventImage}>
          <Image
            src={imageUrl}
            alt={(address as string) ?? 'Event'}
            fill
            className={styles.img}
          />
        </div>
      )}
      <div className={styles.eventInfo}>
        <div className={styles.eventInfoText}>
          {address && <p className={styles.detailRow}>{address as string}</p>}
          {datetime && <p className={styles.detailRow}>{datetime as string}</p>}
          {ticketPrice && (
            <p className={styles.detailRow}>Tickets: {ticketPrice as string}</p>
          )}
        </div>
        {ticketUrl && (
          <a
            href={ticketUrl as string}
            className={styles.ticketLink}
            target='_blank'
            rel='noreferrer'
          >
            Purchase Tickets
          </a>
        )}
      </div>
    </section>
  )
}
