import type { Asset } from 'contentful'
import { getAllPublications } from '@/lib/publications'
import type { PublicationEntry } from '@/types/publication'
import Tile from '@/components/ui/tile'
import styles from './page.module.css'

export const revalidate = 3600

export default async function PublishingPage() {
  const publications = await getAllPublications()

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
