import type { FeaturedArtistsEntry } from '@/types/event'
import styles from './modules.module.css'

export default function FeaturedArtists({
  entry,
}: {
  entry: FeaturedArtistsEntry
}) {
  const { artists } = entry.fields
  const rawArtists = entry.fields.artists
  const artistList = Array.isArray(rawArtists)
    ? (rawArtists as string[]).map((a) => a.trim()).filter(Boolean)
    : typeof rawArtists === 'string'
      ? (rawArtists as string)
          .split('\n')
          .map((a) => a.trim())
          .filter(Boolean)
      : []

  return (
    <section className={styles.featuredArtists}>
      <span className={styles.heading}>
        Featured Artists
      </span>
      <ul className={styles.artistList}>
        {artistList.map((artist, i) => (
          <li key={i} className={styles.artistItem}>
            {artist}
          </li>
        ))}
      </ul>
    </section>
  )
}
