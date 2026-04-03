import Image from 'next/image'
import Link from 'next/link'
import type { Asset } from 'contentful'
import { getAllPublications } from '@/lib/publications'
import type { PublicationEntry } from '@/types/publication'
import styles from './page.module.css'

export const revalidate = 3600

export default async function PublishingPage() {
  const publications = await getAllPublications()

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <span className={styles.label}>PUBLISHING</span>
      </div>

      <ul className={styles.list}>
        {publications.map((publication: PublicationEntry) => {
          const tileAsset = publication.fields.tileImage as unknown as Asset
          const tileImageUrl = tileAsset?.fields?.file?.url
            ? `https:${tileAsset.fields.file.url}`
            : null

          const date = publication.fields.publicationDate
            ? new Date(
                publication.fields.publicationDate as string,
              ).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })
            : null

          return (
            <li key={publication.sys.id} className={styles.tile}>
              {tileImageUrl && (
                <div className={styles.tileImage}>
                  <Image
                    src={tileImageUrl}
                    alt={publication.fields.title as string}
                    fill
                    className={styles.img}
                  />
                </div>
              )}
              <div className={styles.tileContent}>
                {date && <p className={styles.date}>{date}</p>}
                <h2 className={styles.title}>
                  {publication.fields.title as string}
                </h2>
                {publication.fields.tileText && (
                  <p className={styles.tileText}>
                    {publication.fields.tileText as string}
                  </p>
                )}
                <Link
                  href={`/publishing/${publication.fields.slug}`}
                  className={styles.learnMore}
                >
                  Learn More
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
