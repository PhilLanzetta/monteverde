import { notFound } from 'next/navigation'
import type { Asset } from 'contentful'
import { getHomePage } from '@/lib/home'
import type { EventEntry } from '@/types/event'
import type { PublicationEntry } from '@/types/publication'
import Tile from '@/components/ui/tile'
import LandingOverlay from '@/components/layout/landingOverlay'

export const revalidate = 3600

export default async function HomePage() {
  const page = await getHomePage()
  if (!page) notFound()

  const tiles =
    (page.fields.tiles as unknown as (EventEntry | PublicationEntry)[]) ?? []

  return (
    <>
      <LandingOverlay />
      <div>
        {tiles.map((entry) => {
          const type = entry.sys.contentType.sys.id

          if (type === 'event') {
            const event = entry as EventEntry
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

          if (type === 'publication') {
            const pub = entry as PublicationEntry
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
