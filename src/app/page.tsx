import type { Asset } from 'contentful'
import { getAllEvents } from '@/lib/events'
import { getAllPublications } from '@/lib/publications'
import type { EventEntry } from '@/types/event'
import type { PublicationEntry } from '@/types/publication'
import Tile from '@/components/ui/tile'
import LandingOverlay from '@/components/layout/landingOverlay'

type TileItem =
  | { type: 'event'; entry: EventEntry }
  | { type: 'publication'; entry: PublicationEntry }

function interleave(
  events: EventEntry[],
  publications: PublicationEntry[],
): TileItem[] {
  const result: TileItem[] = []
  const maxLen = Math.max(events.length, publications.length)
  for (let i = 0; i < maxLen; i++) {
    if (i < events.length) result.push({ type: 'event', entry: events[i] })
    if (i < publications.length)
      result.push({ type: 'publication', entry: publications[i] })
  }
  return result
}

export default async function HomePage() {
  const [events, publications] = await Promise.all([
    getAllEvents(),
    getAllPublications(),
  ])

  const tiles = interleave(events, publications)

  return (
    <>
      <LandingOverlay />
      <div>
        {tiles.map((item) => {
          if (item.type === 'event') {
            const event = item.entry
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
          }

          if (item.type === 'publication') {
            const pub = item.entry
            const asset = pub.fields.tileImage as unknown as Asset
            const imageUrl = asset?.fields?.file?.url
              ? `https:${asset.fields.file.url}`
              : null
            if (!imageUrl) return null
            return (
              <Tile
                key={pub.sys.id}
                label='PUBLISHING'
                title={pub.fields.title as string}
                imageUrl={imageUrl}
                tileText={pub.fields.tileText as string | undefined}
                href={`/publishing/${pub.fields.slug}`}
                variant='publication'
              />
            )
          }

          return null
        })}
      </div>
    </>
  )
}
