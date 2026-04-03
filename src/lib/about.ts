import { client } from './contentful'
import type { AboutPageEntry, AboutPageSkeleton } from '@/types/about'

export async function getAboutPage(): Promise<AboutPageEntry | null> {
  const entries = await client.getEntries<AboutPageSkeleton>({
    content_type: 'aboutPage',
    limit: 1,
    include: 4,
  })
  return (entries.items[0] as AboutPageEntry) ?? null
}
