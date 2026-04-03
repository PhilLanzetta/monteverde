import { client } from './contentful'
import type { EventEntry, EventSkeleton } from '@/types/event'

export async function getAllEvents(): Promise<EventEntry[]> {
  const entries = await client.getEntries<EventSkeleton>({
    content_type: 'event',
    include: 3,
  })
  return (entries.items as EventEntry[]).sort((a, b) => {
    const dateA = new Date(a.fields.date as string).getTime()
    const dateB = new Date(b.fields.date as string).getTime()
    return dateB - dateA
  })
}

export async function getEventBySlug(slug: string): Promise<EventEntry | null> {
  const entries = await client.getEntries<EventSkeleton>({
    content_type: 'event',
    'fields.slug': slug,
    limit: 1,
    include: 3,
  })
  return (entries.items[0] as EventEntry) ?? null
}
