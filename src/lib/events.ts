import { client } from './contentful'
import type { EventEntry, EventSkeleton } from '@/types/event'

export async function getAllEvents(): Promise<EventEntry[]> {
  const entries = await client.getEntries<EventSkeleton>({
    content_type: 'event',
    order: ['sys.createdAt'],
    include: 3,
  })
  return entries.items as EventEntry[]
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
