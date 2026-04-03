import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Asset } from 'contentful'
import { getAllPublications, getPublicationBySlug } from '@/lib/publications'
import type {
  AuthorEntry,
  ImageGalleryEntry,
  ImageWrapperEntry,
} from '@/types/publication'
import HeroSlideshow from '@/components/modules/heroSlideshow'
import styles from './page.module.css'

export async function generateStaticParams() {
  const publications = await getAllPublications()
  return publications.map((p) => ({ slug: p.fields.slug as string }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const publication = await getPublicationBySlug(slug)
  if (!publication) return {}
  return { title: `${publication.fields.title} — Monteverde` }
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const publication = await getPublicationBySlug(slug)
  if (!publication) notFound()

  const heroImages =
    (publication.fields.heroImages as unknown as ImageWrapperEntry[]) ?? []
  const authors = (publication.fields.authors as unknown as AuthorEntry[]) ?? []
  const gallery = publication.fields
    .imageGallery as unknown as ImageGalleryEntry | null
  const galleryImages =
    (gallery?.fields?.images as unknown as ImageWrapperEntry[]) ?? []

  return (
    <article className={styles.page}>
      {/* ── Hero: two columns ── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.label}>PUBLISHING</span>
          <h1 className={styles.title}>{publication.fields.title as string}</h1>
          {publication.fields.heroDescription && (
            <p className={styles.heroDescription}>
              {publication.fields.heroDescription as string}
            </p>
          )}
          {publication.fields.purchaseLink && (
            <a
              href={publication.fields.purchaseLink as string}
              className={styles.purchaseBtn}
              target='_blank'
              rel='noreferrer'
            >
              Purchase
            </a>
          )}
        </div>
        <div className={styles.heroRight}>
          <HeroSlideshow images={heroImages} />
        </div>
      </section>

      {/* ── Authors ── */}
      {authors.length > 0 && (
        <section className={styles.authors}>
          {authors.map((author) => {
            const authorAsset = author.fields.image as unknown as Asset
            const authorImageUrl = authorAsset?.fields?.file?.url
              ? `https:${authorAsset.fields.file.url}`
              : null
            return (
              <div key={author.sys.id} className={styles.author}>
                {authorImageUrl && (
                  <div className={styles.authorImage}>
                    <Image
                      src={authorImageUrl}
                      alt={author.fields.name as string}
                      fill
                      className={styles.img}
                    />
                  </div>
                )}
                <div className={styles.authorInfo}>
                  <span className={styles.label}>AUTHOR</span>
                  <h2 className={styles.authorName}>
                    {author.fields.name as string}
                  </h2>
                  {author.fields.bio && (
                    <p className={styles.authorBio}>
                      {author.fields.bio as string}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </section>
      )}

      {/* ── Image Gallery ── */}
      {gallery && galleryImages.length > 0 && (
        <section className={styles.gallery}>
          {gallery.fields.heading && (
            <h2 className={styles.galleryHeading}>
              {gallery.fields.heading as string}
            </h2>
          )}
          <div className={styles.galleryGrid}>
            {galleryImages.map((wrapper) => {
              const asset = wrapper.fields.image as unknown as Asset
              const imageUrl = asset?.fields?.file?.url
                ? `https:${asset.fields.file.url}`
                : null
              const caption = wrapper.fields.caption as string | undefined
              return imageUrl ? (
                <div key={wrapper.sys.id} className={styles.galleryItem}>
                  <div className={styles.galleryImage}>
                    <Image
                      src={imageUrl}
                      alt={caption ?? ''}
                      fill
                      className={styles.img}
                    />
                  </div>
                  {caption && <p className={styles.caption}>{caption}</p>}
                </div>
              ) : null
            })}
          </div>
        </section>
      )}
    </article>
  )
}
