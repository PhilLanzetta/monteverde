import { client } from './contentful'
import type { PublicationEntry, PublicationSkeleton } from '@/types/publication'

export async function getAllPublications(): Promise<PublicationEntry[]> {
  const entries = await client.getEntries<PublicationSkeleton>({
    content_type: 'publication',
    include: 2,
  })
  return (entries.items as PublicationEntry[]).sort((a, b) => {
    const dateA = new Date(a.fields.publicationDate as string).getTime()
    const dateB = new Date(b.fields.publicationDate as string).getTime()
    return dateB - dateA
  })
}

export async function getPublicationBySlug(
  slug: string,
): Promise<PublicationEntry | null> {
  const entries = await client.getEntries<PublicationSkeleton>({
    content_type: 'publication',
    'fields.slug': slug,
    limit: 1,
    include: 3,
  })
  return (entries.items[0] as PublicationEntry) ?? null
}
