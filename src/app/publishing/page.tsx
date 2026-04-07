import type { Asset } from 'contentful'
import { getHomePage } from '@/lib/home'
import type { PublicationEntry } from '@/types/publication'
import Tile from '@/components/ui/tile'
import styles from './page.module.css'

export const revalidate = 3600

export default async function PublishingPage() {
  const homePage = await getHomePage()
  const tiles = (homePage?.fields.tiles as unknown as any[]) ?? []
  const publications = tiles.filter(
    (t) => t.sys.contentType.sys.id === 'publication',
  ) as PublicationEntry[]

  return (
    <div className={styles.page}>
      {publications.map((pub: PublicationEntry) => {
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
      })}
    </div>
  )
}
