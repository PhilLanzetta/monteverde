import Image from 'next/image'
import type { EventDetailsEntry } from '@/types/event'
import type { Asset } from 'contentful'
import styles from './modules.module.css'

export default function EventDetails({ entry }: { entry: EventDetailsEntry }) {
  const { date, time, location, ticketLink, image } = entry.fields
  const asset = image as unknown as Asset
  const imageUrl = asset?.fields?.file?.url
    ? `https:${asset.fields.file.url}`
    : null

  const formattedDate = date
    ? new Date(date as string).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <section className={styles.eventDetails}>
      {imageUrl && (
        <div className={styles.eventImage}>
          <Image
            src={imageUrl}
            alt={(location as string) ?? 'Event'}
            fill
            className={styles.img}
          />
        </div>
      )}
      <div className={styles.eventInfo}>
        {formattedDate && (
          <p className={styles.detailRow}>
            <span className={styles.detailLabel}>Date</span>
            {formattedDate}
          </p>
        )}
        {time && (
          <p className={styles.detailRow}>
            <span className={styles.detailLabel}>Time</span>
            {time as string}
          </p>
        )}
        {location && (
          <p className={styles.detailRow}>
            <span className={styles.detailLabel}>Location</span>
            {location as string}
          </p>
        )}
        {ticketLink && (
          <a
            href={ticketLink as string}
            className={styles.ticketLink}
            target='_blank'
            rel='noreferrer'
          >
            Get Tickets
          </a>
        )}
      </div>
    </section>
  )
}
