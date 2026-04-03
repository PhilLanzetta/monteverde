import Image from 'next/image'
import Link from 'next/link'
import type { Asset } from 'contentful'
import { getAllEvents } from '@/lib/events'
import type { EventEntry } from '@/types/event'
import styles from './page.module.css'

export const revalidate = 3600

export default async function EventsPage() {
  const events = await getAllEvents()

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <span className={styles.label}>EVENTS</span>
      </div>

      <ul className={styles.list}>
        {events.map((event: EventEntry) => {
          const tileAsset = event.fields.tileImage as unknown as Asset
          const tileImageUrl = tileAsset?.fields?.file?.url
            ? `https:${tileAsset.fields.file.url}`
            : null

          const date = event.fields.date
            ? new Date(event.fields.date as string).toLocaleDateString(
                'en-US',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              )
            : null

          return (
            <li key={event.sys.id} className={styles.tile}>
              {tileImageUrl && (
                <div className={styles.tileImage}>
                  <Image
                    src={tileImageUrl}
                    alt={event.fields.title as string}
                    fill
                    className={styles.img}
                  />
                </div>
              )}
              <div className={styles.tileContent}>
                {date && <p className={styles.date}>{date}</p>}
                <h2 className={styles.title}>{event.fields.title as string}</h2>
                {event.fields.tileText && (
                  <p className={styles.tileText}>
                    {event.fields.tileText as string}
                  </p>
                )}
                <Link
                  href={`/event/${event.fields.slug}`}
                  className={styles.learnMore}
                >
                  Learn More
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
