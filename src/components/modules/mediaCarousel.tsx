import type { FeaturedArtistsEntry } from '@/types/event'
import styles from './modules.module.css'

export default function FeaturedArtists({
  entry,
}: {
  entry: FeaturedArtistsEntry
}) {
  const { artists } = entry.fields
  const artistList = (artists as string)
    .split('\n')
    .map((a) => a.trim())
    .filter(Boolean)

  return (
    <section className={styles.featuredArtists}>
      <span className={styles.label}>Featured Artists</span>
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
