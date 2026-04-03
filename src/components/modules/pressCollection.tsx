import type { PressCollectionEntry, PressItemEntry } from '@/types/event'
import styles from './modules.module.css'

export default function PressCollection({
  entry,
}: {
  entry: PressCollectionEntry
}) {
  const items = (entry.fields.pressItems as unknown as PressItemEntry[]) ?? []

  return (
    <section className={styles.pressCollection}>
      <span className={styles.label}>Press</span>
      <ul className={styles.pressList}>
        {items.map((item) => (
          <li key={item.sys.id} className={styles.pressItem}>
            <a
              href={item.fields.link as string}
              target='_blank'
              rel='noreferrer'
              className={styles.pressLink}
            >
              <span className={styles.pressTitle}>
                {item.fields.title as string}
              </span>
              <span className={styles.pressPublication}>
                {item.fields.publicationName as string}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
