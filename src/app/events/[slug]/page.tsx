import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Asset } from 'contentful'
import { getAllEvents, getEventBySlug } from '@/lib/events'
import ContentModuleRenderer from '@/components/modules/contentModuleRenderer'
import type { ContentModule } from '@/types/event'
import styles from './page.module.css'

export async function generateStaticParams() {
  const events = await getAllEvents()
  return events.map((event) => ({
    slug: event.fields.slug as string,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) return {}
  return { title: `${event.fields.title} — Monteverde` }
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) notFound()

  const heroAsset = event.fields.heroImage as unknown as Asset
  const heroUrl = heroAsset?.fields?.file?.url
    ? `https:${heroAsset.fields.file.url}`
    : null

  const modules = (event.fields.content as unknown as ContentModule[]) ?? []

  return (
    <article className={styles.page}>
      {heroUrl && (
        <div className={styles.hero}>
          <Image
            src={heroUrl}
            alt={event.fields.title as string}
            fill
            priority
            className={styles.heroImg}
          />
        </div>
      )}

      <div className={styles.titleBlock}>
        <span className={styles.label}>EVENT</span>
        <h1 className={styles.title}>{event.fields.title as string}</h1>
      </div>

      <ContentModuleRenderer modules={modules} />
    </article>
  )
}
