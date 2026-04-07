import type { Asset } from 'contentful'
import { getHomePage } from '@/lib/home'
import type { EventEntry } from '@/types/event'
import Tile from '@/components/ui/tile'
import styles from './page.module.css'

export const revalidate = 3600

export default async function EventsPage() {
  const homePage = await getHomePage()
  const tiles = (homePage?.fields.tiles as unknown as any[]) ?? []
  const events = tiles.filter(
    (t) => t.sys.contentType.sys.id === 'event',
  ) as EventEntry[]

  return (
    <div className={styles.page}>
      {events.map((event: EventEntry) => {
        const asset = event.fields.tileImage as unknown as Asset
        const imageUrl = asset?.fields?.file?.url
          ? `https:${asset.fields.file.url}`
          : null
        if (!imageUrl) return null
        return (
          <Tile
            key={event.sys.id}
            label='EVENTS'
            title={event.fields.title as string}
            imageUrl={imageUrl}
            tileText={event.fields.tileText as string | undefined}
            href={`/events/${event.fields.slug}`}
            variant='event'
          />
        )
      })}
    </div>
  )
}
