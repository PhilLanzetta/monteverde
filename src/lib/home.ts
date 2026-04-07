import { client } from './contentful'
import type { HomePageEntry, HomePageSkeleton } from '@/types/home'

export async function getHomePage(): Promise<HomePageEntry | null> {
  const entries = await client.getEntries<HomePageSkeleton>({
    content_type: 'homePage',
    'fields.title': 'Home Page (only entry)',
    limit: 1,
    include: 3,
  })
  return (entries.items[0] as HomePageEntry) ?? null
}
