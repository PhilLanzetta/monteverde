import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
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
  return publications
    .filter(
      (p) => typeof p.fields.slug === 'string' && p.fields.slug.trim() !== '',
    )
    .map((p) => ({ slug: p.fields.slug as string }))
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

function GalleryImage({ wrapper }: { wrapper: ImageWrapperEntry }) {
  const asset = wrapper.fields.image as unknown as Asset
  const imageUrl = asset?.fields?.file?.url
    ? `https:${asset.fields.file.url}`
    : null
  const caption = wrapper.fields.caption as string | undefined
  if (!imageUrl) return null
  return (
    <div className={styles.galleryItem}>
      <Image
        src={imageUrl}
        alt={caption ?? ''}
        width={0}
        height={0}
        sizes='50vw'
        className={styles.galleryImage}
      />
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  )
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
          <h1
            className={styles.title}
            dangerouslySetInnerHTML={{
              __html: publication.fields.title as string,
            }}
          />
          {publication.fields.heroDescription && (
            <div className={styles.heroDescription}>
              <ReactMarkdown>
                {publication.fields.heroDescription as string}
              </ReactMarkdown>
            </div>
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
                <h2 className={styles.authorName}>
                  {author.fields.name as string}
                </h2>
                {author.fields.bio && (
                  <div className={styles.authorBio}>
                    <ReactMarkdown>{author.fields.bio as string}</ReactMarkdown>
                  </div>
                )}
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
              </div>
            )
          })}
        </section>
      )}

      {/* ── Image Gallery ── */}
      {gallery && galleryImages.length > 0 && (
        <section className={styles.gallery}>
          {gallery.fields.heading && (
            <h2
              className={styles.galleryHeading}
              dangerouslySetInnerHTML={{
                __html: gallery.fields.heading as string,
              }}
            />
          )}

          {/* Desktop: two-column masonry */}
          <div className={styles.galleryGrid}>
            <div className={styles.galleryCol}>
              {galleryImages
                .filter((_, i) => i % 2 === 0)
                .map((wrapper) => (
                  <GalleryImage key={wrapper.sys.id} wrapper={wrapper} />
                ))}
            </div>
            <div className={styles.galleryCol}>
              {galleryImages
                .filter((_, i) => i % 2 !== 0)
                .map((wrapper) => (
                  <GalleryImage key={wrapper.sys.id} wrapper={wrapper} />
                ))}
            </div>
          </div>

          {/* Mobile: single column, original order */}
          <div className={styles.galleryMobile}>
            {galleryImages.map((wrapper) => (
              <GalleryImage key={wrapper.sys.id} wrapper={wrapper} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
